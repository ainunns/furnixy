import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CartType } from "@/types/entities/cart";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

const CartIndex = () => {
  const { cart } = usePage().props as unknown as { cart: CartType[] };

  return (
    <AuthenticatedLayout>
      <Head title="All Product" />
      <div className="px-10 md:px-20 py-8">
        <div className="flex justify-between">
          <Typography variant="h1" className="font-semibold mb-4">
            Cart
          </Typography>
        </div>
        <div className="grid grid-cols-2">
          <Typography className="font-bold">Product Name</Typography>
          <Typography className="font-bold">Quantity</Typography>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            {cart.map((c) => (
              <Typography variant="s1">{c.product.name}</Typography>
            ))}
          </div>
          <div className="flex flex-col">
            {cart.map((c) => (
              <Typography variant="s1">{c.quantity}</Typography>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CartIndex;
