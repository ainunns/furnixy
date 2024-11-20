import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import Input from "@/Components/Forms/Input";
import SearchableSelectInput from "@/Components/Forms/SelectInput";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProductType } from "@/types/entities/product";
import { Head, useForm as useFormInertia } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  city: string;
  categories: number[];
};

export default function Edit({
  product,
  options,
}: {
  product: ProductType;
  options: { value: string; label: string }[];
}) {
  const methods = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      city: product.city,
      categories: product.category.map((item) => item.id),
    },
  });

  const { handleSubmit, reset, getValues } = methods;

  const { post, processing, transform } = useFormInertia<
    Omit<ProductType, "id" | "image_url">
  >({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    city: product.city,
  });

  transform((data) => ({
    ...data,
    ...getValues(),
  }));

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("product.update", product.id), {
      method: "patch",
      forceFormData: true,
      onSuccess: () => toast.success("Product has been updated."),
      onError: (errors) =>
        Object.entries(errors).forEach(([_, value]) => {
          toast.error("Error updating product", {
            description: value[0],
          });
        }),
      onFinish: () => reset(),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit Product" />
      <section className="px-10 md:px-20 py-8 flex flex-col gap-8">
        <div className="flex flex-col items-start gap-4 w-full">
          <ButtonLink
            leftIcon={ArrowLeft}
            href={route("product.index")}
            openNewTab={false}
          >
            Back to Home
          </ButtonLink>
          <Typography variant="h1">Edit Product</Typography>
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
              <SearchableSelectInput
                id="categories"
                label="Categories"
                placeholder="Select Category"
                options={options}
                isMulti
                validation={{
                  required: "Category is required",
                }}
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
