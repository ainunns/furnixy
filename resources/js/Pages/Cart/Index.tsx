import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CartType } from "@/types/entities/cart";
import { Head } from "@inertiajs/react";

const CartIndex = ({ cart }: { cart: CartType[] }) => {
  return (
    <AuthenticatedLayout>
      <Head title="Cart" />
      <div className="px-10 md:px-20 py-8">
        <div className="flex justify-between">
          <Typography variant="h1" className="font-semibold mb-4">
            Cart
          </Typography>
        </div>
        <div className="grid grid-cols-4 mt-6 gap-y-4 gap-x-2">
          <Typography variant="h2">Product Name</Typography>
          <Typography variant="h2">Quantity</Typography>
          <Typography variant="h2">Price</Typography>
          <Typography variant="h2">Total Price</Typography>
          {cart.map((c) => (
            <>
              <Typography variant="s2">{c.product.name}</Typography>
              <Typography variant="s2">{c.quantity}</Typography>
              <Typography variant="s2">{c.product.price}</Typography>
              <Typography variant="s2">
                {c.quantity * c.product.price}
              </Typography>
            </>
          ))}
          <div></div>
          <div></div>
          <Typography variant="h3" className="font-medium">
            Total Price:
          </Typography>
          <Typography variant="h3" className="font-normal">
            {cart.reduce((acc, c) => acc + c.quantity * c.product.price, 0)}
          </Typography>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CartIndex;
