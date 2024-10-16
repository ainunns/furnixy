import ButtonLink from "@/Components/ButtonLink";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { cn } from "@/Lib/utils";
import { ProductType } from "@/types/entities/product";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { Plus, Search, XCircle } from "lucide-react";
import * as React from "react";

const ProductIndex = ({ product }: { product: ProductType[] }) => {
  const [filter, setFilter] = React.useState<string>("");
  const productList = product.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <AuthenticatedLayout>
      <Head title="All Product" />
      <div className="px-10 md:px-20 py-8 flex flex-col gap-4">
        <Typography variant="h1" className="font-semibold">
          All Product
        </Typography>
        <div className="flex justify-between mt-6">
          <div className="relative mt-1 self-start">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="text-xl text-typo" />
            </div>
            <input
              type="text"
              value={filter ?? ""}
              onChange={(e) => {
                setFilter(String(e.target.value));
              }}
              className={cn(
                "flex w-full rounded-lg shadow-sm",
                "min-h-[2.25rem] py-0 px-10 md:min-h-[2.5rem]",
                "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
              )}
              placeholder="Search..."
            />
            {filter !== "" && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button
                  type="button"
                  onClick={() => setFilter("")}
                  className="p-1"
                >
                  <XCircle className="text-xl text-typo-icons" />
                </button>
              </div>
            )}
          </div>
          <ButtonLink
            href={route("product.create")}
            openNewTab={false}
            leftIcon={Plus}
          >
            Add Product
          </ButtonLink>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {productList.map((p) => (
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

export default ProductIndex;
