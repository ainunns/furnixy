import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProductType } from "@/types/entities/product";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

export default function Show({ product }: { product: ProductType }) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      Inertia.delete(`/product/${product.id}/delete`, {
        onSuccess: () => {
          alert("Product deleted successfully!");
        },
      });
    }
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
          <div className="flex flex-col gap-2 items-center">
            <img
              src={`/storage/${product.image_url}`}
              alt={product.name}
              className="w-1/2 rounded-md mb-4"
            />
            <div className="grid grid-cols-2 w-3/5">
              <Typography variant="s1">Name</Typography>
              <Typography variant="s1">: {product.name}</Typography>
            </div>
            <div className="grid grid-cols-2 w-3/5">
              <Typography variant="s1">Description</Typography>
              <Typography variant="s1">: {product.description}</Typography>
            </div>
            <div className="grid grid-cols-2 w-3/5">
              <Typography variant="s1">Price</Typography>
              <Typography variant="s1">: Rp{product.price}</Typography>
            </div>
            <div className="grid grid-cols-2 w-3/5">
              <Typography variant="s1">Stock</Typography>
              <Typography variant="s1">: {product.stock}</Typography>
            </div>
            <div className="grid grid-cols-2 w-3/5">
              <Typography variant="s1">City</Typography>
              <Typography variant="s1">: {product.city}</Typography>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center flex-col gap-2">
          <ButtonLink
            href={route("product.edit", product.id)}
            openNewTab={false}
            className="flex w-3/5"
          >
            Edit Product
          </ButtonLink>
          <Button onClick={handleDelete} className="flex w-3/5">
            Delete Product
          </Button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
