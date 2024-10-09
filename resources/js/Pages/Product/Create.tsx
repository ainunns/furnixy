import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProductType } from "@/types/entities/product";
import { PredictionType } from "@/types/entities/roboflow";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { type FormEventHandler, useState } from "react";

export default function Create() {
  const [categories, setCategories] = useState<number[]>([]);
  const { data, setData, post, processing, errors, reset } = useForm<
    Omit<ProductType, "id">
  >({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categories: categories,
    city: "",
    image_url: null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setData("image_url", files[0]);
      fetchCategories(files[0]);
    }
  };

  const fetchCategories = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target?.result?.toString().split(",")[1];

      if (base64Image) {
        axios<PredictionType>({
          method: "POST",
          url: process.env.ROBOFLOW_API_URL,
          params: {
            api_key: process.env.ROBOFLOW_API_KEY,
          },
          data: base64Image,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then(function (response) {
            const predictions = response.data.predictions || [];
            const newCategories = predictions.map(
              (prediction) => prediction.class_id + 1,
            );
            setCategories(newCategories);
            setData("categories", newCategories);
          })
          .catch(function (error) {
            console.error(error.message);
          });
      } else {
        console.error("Failed to read image file");
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
    reader.readAsDataURL(file);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("product.store"), {
      onFinish: () => reset(),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create Product" />
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
          <form onSubmit={submit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <InputLabel htmlFor="name">
                Nama <span className="text-red-500">*</span>
              </InputLabel>

              <Input
                id="name"
                name="name"
                value={data.name}
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData("name", e.target.value)}
              />

              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="flex flex-col gap-1.5">
              <InputLabel htmlFor="description">
                Description <span className="text-red-500">*</span>
              </InputLabel>

              <Input
                id="description"
                name="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />

              <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="flex flex-col gap-1.5">
              <InputLabel htmlFor="price">
                Price <span className="text-red-500">*</span>
              </InputLabel>

              <Input
                id="price"
                name="price"
                value={data.price}
                className="mt-1 block w-full"
                onChange={(e) => setData("price", parseInt(e.target.value))}
              />

              <InputError message={errors.price} className="mt-2" />
            </div>

            <div className="flex flex-col gap-1.5">
              <InputLabel htmlFor="stock">
                Stock <span className="text-red-500">*</span>
              </InputLabel>

              <Input
                id="stock"
                name="stock"
                value={data.stock}
                className="mt-1 block w-full"
                onChange={(e) => setData("stock", parseInt(e.target.value))}
              />

              <InputError message={errors.stock} className="mt-2" />
            </div>

            <div className="flex flex-col gap-1.5">
              <InputLabel htmlFor="city">
                City <span className="text-red-500">*</span>
              </InputLabel>

              <Input
                id="city"
                name="city"
                value={data.city}
                className="mt-1 block w-full"
                onChange={(e) => setData("city", e.target.value)}
              />

              <InputError message={errors.city} className="mt-2" />
            </div>

            <div className="flex flex-col gap-1.5">
              <InputLabel htmlFor="image_url">
                Image <span className="text-red-500">*</span>
              </InputLabel>

              <Input
                id="image_url"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />

              <InputError message={errors.image_url} className="mt-2" />
            </div>
            <p>{JSON.stringify(data.categories, null, 2)}</p>

            <Button type="submit" disabled={processing}>
              Submit
            </Button>
          </form>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
