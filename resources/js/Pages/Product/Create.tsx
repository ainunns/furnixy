import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import DropzoneInput from "@/Components/Forms/DropzoneInput";
import Input from "@/Components/Forms/Input";
import SearchableSelectInput from "@/Components/Forms/SelectInput";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toBase64 } from "@/Lib/image";
import { PredictionType } from "@/types/entities/roboflow";
import { Head, useForm as useFormInertia } from "@inertiajs/react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import * as React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: number[];
  city: string;
  image_url: File[] | null;
};

export default function Create({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const [isDropped, setIsDropped] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const { handleSubmit, reset, getValues, watch, setValue, clearErrors } =
    methods;

  const { post, processing, transform } = useFormInertia<Omit<FormData, "id">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categories: [],
    city: "",
    image_url: null,
  });

  const image_url = watch("image_url");

  React.useEffect(() => {
    const fetchPredictionData = async () => {
      if (!isDropped || !image_url) return;

      setIsLoading(true);
      toast.loading("Detecting image category...", {
        id: "detecting-image-category",
      });

      try {
        const response = await axios<PredictionType>({
          method: "POST",
          url: process.env.ROBOFLOW_API_URL || "",
          params: {
            api_key: process.env.ROBOFLOW_API_KEY || "",
          },
          data: await toBase64(image_url[0]),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const newCategories = response.data.predictions.map(
          (category) => (category.class_id as number) + 1,
        );
        setValue("categories", newCategories);
        clearErrors("categories");

        if (newCategories.length === 0) {
          throw new Error("No category detected");
        }

        toast.success("Image category detected");
      } catch (error) {
        toast.error("Error detecting image category", {
          description: error instanceof Error ? error.message : "Unknown error",
        });
        console.error(error);
      } finally {
        toast.dismiss("detecting-image-category");
        setIsLoading(false);
      }
    };

    fetchPredictionData();
  }, [isDropped, image_url]);

  transform((data) => ({
    ...data,
    ...getValues(),
  }));

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("product.store"), {
      forceFormData: true,
      onSuccess: () => {
        toast.success("Product has been added successfully");
      },
      onError: (errors) => {
        Object.entries(errors).forEach(([_, value]) => {
          toast.error("Error adding product", {
            description: value,
          });
        });
      },
      onFinish: () => reset(),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Add Product" />
      <section className="px-10 md:px-20 py-8 flex flex-col gap-8">
        <div className="flex flex-col items-start gap-4 w-full">
          <ButtonLink
            leftIcon={ArrowLeft}
            href={route("product.index")}
            openNewTab={false}
          >
            Back to Home
          </ButtonLink>
          <Typography variant="h1">Add Product</Typography>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <Input
                id="name"
                name="name"
                label="Name"
                validation={{
                  required: "Name is required",
                }}
              />
              <Input
                id="description"
                name="description"
                label="Description"
                validation={{
                  required: "Description is required",
                }}
              />
              <Input
                id="price"
                name="price"
                label="Price"
                type="number"
                validation={{
                  required: "Price is required",
                  min: {
                    value: 0,
                    message: "Price must be greater than 0",
                  },
                }}
              />
              <Input
                id="stock"
                name="stock"
                label="Stock"
                type="number"
                validation={{
                  required: "Stock is required",
                  min: {
                    value: 0,
                    message: "Stock must be greater than 0",
                  },
                }}
              />
              <Input
                id="city"
                name="city"
                label="City"
                validation={{
                  required: "City is required",
                }}
              />
              <DropzoneInput
                id="image_url"
                label="Image"
                setIsDropped={setIsDropped}
                validation={{
                  required: "Image is required",
                }}
              />
              <SearchableSelectInput
                id="categories"
                label="Categories"
                placeholder="Select Category"
                options={options}
                isMulti
                validation={{
                  required: "Category is required",
                }}
                disabled={isLoading || !isDropped}
              />
              <Button type="submit" isLoading={processing}>
                Submit
              </Button>
            </form>
          </FormProvider>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
