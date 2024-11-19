import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import Input from "@/Components/Forms/Input";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProductType } from "@/types/entities/product";
import { Head, router, useForm as useFormInertia } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  product_id: string;
  quantity: number;
};

export default function Show({ product }: { product: ProductType }) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      router.delete(`/product/${product.id}/delete`, {
        onSuccess: () => toast.success("Product has been deleted."),
        onError: () => toast.error("Error deleting product."),
      });
    }
  };

  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const { handleSubmit, reset, getValues } = methods;

  const { post, processing, transform } = useFormInertia<FormData>({
    product_id: product.id,
    quantity: 0,
  });

  transform((data) => ({
    ...data,
    ...getValues(),
  }));

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("cart.add", product.id), {
      onFinish: () => reset(),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Detail Product" />
      <div className="px-10 md:px-10 py-8">
        <div>
          <ButtonLink href="/product" leftIcon={ArrowLeft}>
            Back
          </ButtonLink>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="flex flex-col gap-2 items-center w-full">
            <img
              src={`/storage/${product.image_url}`}
              alt={product.name}
              className="w-1/2 rounded-md mb-4"
            />
            <div className="grid grid-cols-2 w-full md:w-3/5">
              <Typography variant="s1">Name</Typography>
              <Typography variant="s1">: {product.name}</Typography>
            </div>
            <div className="grid grid-cols-2 w-full md:w-3/5">
              <Typography variant="s1">Description</Typography>
              <Typography variant="s1">: {product.description}</Typography>
            </div>
            <div className="grid grid-cols-2 w-full md:w-3/5">
              <Typography variant="s1">Price</Typography>
              <Typography variant="s1">: Rp{product.price}</Typography>
            </div>
            <div className="grid grid-cols-2 w-full md:w-3/5">
              <Typography variant="s1">Stock</Typography>
              <Typography variant="s1">: {product.stock}</Typography>
            </div>
            <div className="grid grid-cols-2 w-full md:w-3/5">
              <Typography variant="s1">City</Typography>
              <Typography variant="s1">: {product.city}</Typography>
            </div>
            <div className="grid grid-cols-2 w-full md:w-3/5">
              <Typography variant="s1">Category</Typography>
              <Typography variant="s1">
                : {product.category.map((category) => category.name).join(", ")}
              </Typography>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center flex-col gap-2">
          <ButtonLink
            href={route("product.edit", product.id)}
            openNewTab={false}
            className="flex w-full md:w-3/5"
          >
            Edit Product
          </ButtonLink>
          <Button onClick={handleDelete} className="flex w-full md:w-3/5">
            Delete Product
          </Button>{" "}
        </div>
        <div className="flex items-center justify-center flex-col gap-2 mt-4">
          <Typography variant="s1" className="font-semibold">
            Add to Cart
          </Typography>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="gap-2 flex flex-col w-full md:w-3/5"
            >
              <Input
                id="quantity"
                name="quantity"
                label="Quantity"
                type="number"
                validation={{
                  required: "Quantity is required",
                }}
              />
              <Button
                type="submit"
                disabled={processing}
                className="flex w-full"
              >
                Submit
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
