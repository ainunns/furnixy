import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import DropzoneInput from "@/Components/Forms/DropzoneInput";
import Input from "@/Components/Forms/Input";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProductType } from "@/types/entities/product";
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
  image_url: string | File | Blob | null;
};

export default function Edit({ product }: { product: ProductType }) {
  // const [categories, setCategories] = useState<number[]>([]);

  const methods = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      // categories: product.categories.map((category) => category.id),
      city: product.city,
      image_url: null,
    },
  });

  const { handleSubmit, reset, getValues } = methods;

  const { post, processing, transform } = useFormInertia<
    Omit<ProductType, "id">
  >({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    categories: [],
    city: product.city,
    image_url: product.image_url,
  });

  // const file = watch("image_url");

  // React.useEffect(() => {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const base64Image = event.target?.result?.toString().split(",")[1];

  //       if (base64Image) {
  //         axios<PredictionType>({
  //           method: "POST",
  //           url: process.env.ROBOFLOW_API_URL,
  //           params: {
  //             api_key: process.env.ROBOFLOW_API_KEY,
  //           },
  //           data: base64Image,
  //           headers: {
  //             "Content-Type": "application/x-www-form-urlencoded",
  //           },
  //         })
  //           .then(function (response) {
  //             const predictions = response.data.predictions || [];
  //             const newCategories = predictions.map(
  //               (prediction) => prediction.class_id + 1
  //             );
  //             setCategories(newCategories);
  //           })
  //           .catch(function (error) {
  //             console.error(error.message);
  //           });
  //       } else {
  //         console.error("Failed to read image file");
  //       }
  //     };
  //     reader.onerror = (error) => {
  //       console.error("Error reading file:", error);
  //     };
  //     if (file instanceof Blob) {
  //       reader.readAsDataURL(file);
  //     } else {
  //       console.error("File is not a Blob");
  //     }
  //   }
  // }, [file]);

  transform((data) => {
    const newData = getValues();

    data.name = newData.name;
    data.description = newData.description;
    data.price = newData.price;
    data.stock = newData.stock;
    data.categories = newData.categories;
    data.city = newData.city;
    data.image_url = newData.image_url;

    return data;
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("product.update", product.id), {
      method: "patch",
      forceFormData: true,
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

              <DropzoneInput
                id="image_url"
                label="Image"
                validation={{
                  required: "Image is required",
                }}
              />

              {/* <p>{JSON.stringify(categories, null, 2)}</p> */}

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
