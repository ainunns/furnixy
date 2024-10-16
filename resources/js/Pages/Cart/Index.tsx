import ButtonLink from "@/Components/ButtonLink";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProductType } from "@/types/entities/product";
import { Link, usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { Plus } from "lucide-react";

const CartIndex = () => {
  const { product } = usePage().props as unknown as { product: ProductType[] };

  return (
    <AuthenticatedLayout>
      <Head title="All Product" />
      <div className="px-10 md:px-20 py-8">
        <div className="flex justify-between">
          <Typography variant="h1" className="font-semibold mb-4">
            All Product
          </Typography>
          <ButtonLink
            href={route("product.create")}
            openNewTab={false}
            leftIcon={Plus}
          >
            Add Product
          </ButtonLink>
        </div>
        <div className="grid md:grid-cols-4 gap-4 mt-4">
          {product.map((p) => (
            <Link
              href={route("product.show", p.id)}
              key={p.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={`/storage/${p.image_url}`}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <Typography variant="h2" className="text-lg font-bold">
                {p.name}
              </Typography>
              <Typography variant="s3" className="text-gray-600">
                {p.description}
              </Typography>
              <Typography variant="s1" className="mt-2">
                <span className="font-semibold">Price:</span> Rp{p.price}
              </Typography>
              <Typography variant="s1">
                <span className="font-semibold">Stock:</span> {p.stock}
              </Typography>
              <Typography variant="s1">
                <span className="font-semibold">City:</span> {p.city}
              </Typography>
              <Typography variant="s1">
                <span className="font-semibold">Category:</span>{" "}
                {p.category.map((category) => category.name).join(", ")}
              </Typography>
            </Link>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CartIndex;
