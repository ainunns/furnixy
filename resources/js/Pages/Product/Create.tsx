import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import DropzoneInput from "@/Components/Forms/DropzoneInput";
import Input from "@/Components/Forms/Input";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm as useFormInertia } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: number[];
  city: string;
  image_url: File | null;
};

export default function Create() {
  // const [categories, setCategories] = useState<number[]>([]);

  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const { handleSubmit, reset, getValues } = methods;

  const { post, processing, transform } = useFormInertia<Omit<FormData, "id">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categories: [],
    city: "",
    image_url: null,
  });

  // const file = watch("image_url");

  // useEffect(() => {
  //   console.log(file);
  //   if (file && file instanceof File) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const base64Image = event.target?.result?.toString().split(",")[1];

  //       if (base64Image) {
  //         axios<{ predictions: { class_id: number }[] }>({
  //           method: "POST",
  //           url: process.env.ROBOFLOW_API_URL || "",
  //           params: {
  //             api_key: process.env.ROBOFLOW_API_KEY,
  //           },
  //           data: base64Image,
  //           headers: {
  //             "Content-Type": "application/x-www-form-urlencoded",
  //           },
  //         })
  //           .then((response) => {
  //             const predictions = response.data.predictions || [];
  //             const newCategories = predictions.map(
  //               (prediction) => prediction.class_id + 1
  //             );
  //             setCategories(newCategories);
  //           })
  //           .catch((error) => {
  //             console.error("Error processing image:", error.message);
  //           });
  //       } else {
  //         console.error("Failed to read image file");
  //       }
  //     };
  //     reader.onerror = (error) => {
  //       console.error("Error reading file:", error);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }, [file]);

  transform((data) => ({
    ...data,
    ...getValues(),
    // categories,
  }));

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("product.store"), {
      forceFormData: true,
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
                validation={{
                  required: "Image is required",
                }}
              />
              {/* <p>Categories: {JSON.stringify(categories)}</p> */}
              <Button type="submit" disabled={processing}>
                Submit
              </Button>
            </form>
          </FormProvider>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
