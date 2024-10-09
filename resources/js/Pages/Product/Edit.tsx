import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProductType } from "@/types/entities/product";
import { Head, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { useState, type FormEventHandler } from "react";

export default function Edit({ product }: { product: ProductType }) {
  const [previewUrl, setPreviewUrl] = useState("/storage/" + product.image_url);

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm<
    Omit<ProductType, "id">
  >({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    city: product.city,
    image_url: previewUrl,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setData("image_url", files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
    }
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("product.update", product.id), {
      onFinish: () => reset(),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit Product" />
      <section className="px-10 md:px-20 py-8 flex flex-col gap-8">
        <div className="flex flex-col items-start gap-4 w-full">
          <ButtonLink leftIcon={ArrowLeft} href="{{ route('product') }}">
            Back
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
                accept="image/jpeg"
              />

              <img src={previewUrl} alt={product.name} width="300px" />

              <InputError message={errors.image_url} className="mt-2" />
            </div>

            <Button type="submit" disabled={processing || !isDirty}>
              Submit
            </Button>
          </form>
        </div>
      </section>
    </AuthenticatedLayout>
  );
}
