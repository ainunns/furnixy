import Button from "@/Components/Button";
import Checkbox from "@/Components/Forms/Checkbox";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { numberToCurrency } from "@/Lib/utils";
import { CartType } from "@/types/entities/cart";
import { Head, router, useForm as useFormInertia } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import * as React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import NotFound from "./container/NotFound";

type CheckoutProductType = {
  product_id: string[];
};

const CartIndex = ({ cart }: { cart: CartType[] }) => {
  const [checkedOut, setCheckedOut] = React.useState<string[]>([]);
  const methods = useForm<CheckoutProductType>();
  const { handleSubmit, getValues, setValue } = methods;
  const { post, processing, transform, reset } = useFormInertia<
    CheckoutProductType[]
  >([]);

  const readyToCheckout =
    cart.filter((item) => checkedOut.includes(item.id.toString())) ?? [];

  transform((data) => ({ ...data, ...getValues() }));

  const onSubmit: SubmitHandler<CheckoutProductType> = async () => {
    post(route("cart.checkout"), {
      onSuccess: () => {
        toast.success("Product has been added to your order.");
      },

      onError: (errors) => {
        Object.entries(errors).forEach(([_, value]) => {
          toast.error("Error adding product", {
            description: value,
          });
        });
      },
      onFinish: () => reset(),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Cart" />
      {cart.length === 0 ? (
        <NotFound />
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-10 md:px-20 py-16 w-full flex flex-col lg:flex-row gap-20 relative"
          >
            <section className="w-full lg:w-3/5 flex flex-col gap-8 relative">
              <div className="flex gap-6 items-end">
                <Typography variant="j2">Cart</Typography>
                <Typography variant="s1" className="text-neutral-400">
                  {cart.length} ITEM{cart.length > 1 && "S"}
                </Typography>
              </div>
              {cart.map((item, index) => (
                <>
                  {index !== 0 && <hr className="border-typo-tertiary" />}
                  <div
                    key={item.id}
                    className="flex gap-6 items-center p-4 w-full justify-between"
                  >
                    <div className="flex gap-6 items-center w-full">
                      <Checkbox
                        name="product_id"
                        value={item.id}
                        checked={checkedOut.includes(item.id.toString())}
                        onChange={() => {
                          const itemIdString = item.id.toString();
                          setCheckedOut((prev) =>
                            prev.includes(itemIdString)
                              ? prev.filter((id) => id !== itemIdString)
                              : [...prev, itemIdString],
                          );

                          const currentValues = getValues("product_id") || [];
                          const newValues = currentValues.includes(itemIdString)
                            ? currentValues.filter((id) => id !== itemIdString)
                            : [...currentValues, itemIdString];

                          setValue("product_id", newValues, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          });
                        }}
                      />
                      <img
                        src={`/storage/${item.product.image_url}`}
                        alt={item.product.name}
                        className="size-20 lg:size-40 object-fit rounded"
                      />
                      <div className="flex flex-col gap-4 w-full">
                        <Typography variant="h2" className="text-typo">
                          {item.product.name}
                        </Typography>
                        <Typography
                          variant="h4"
                          className="text-typo-secondary"
                        >
                          {numberToCurrency(item.product.price)}
                        </Typography>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to delete this item?")
                        ) {
                          router.delete(`/cart/${item.id}/delete`, {
                            onSuccess: () =>
                              toast.success("Item has been deleted."),
                            onError: () => toast.error("Error deleting item."),
                          });
                        }
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </>
              ))}
            </section>
            <section className="bg-white w-full lg:w-2/5 flex flex-col gap-8 border border-typo-outline p-8 rounded h-fit">
              <Typography variant="h1" className="text-typo">
                Order Summary
              </Typography>
              <Checkbox
                name="all"
                label={
                  checkedOut.length === cart.length
                    ? "Remove all items"
                    : "Select all items"
                }
                onChange={() => {
                  if (checkedOut.length === cart.length) {
                    setValue("product_id", [], {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    setCheckedOut([]);
                  } else {
                    setValue(
                      "product_id",
                      cart.map((item) => item.id.toString()),
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      },
                    );
                    setCheckedOut(cart.map((item) => item.id.toString()));
                  }
                }}
                checked={checkedOut.length === cart.length}
              />
              <div className="w-full grid grid-cols-5 items-center gap-x-4 gap-y-6">
                {readyToCheckout.length === 0 ? (
                  <Typography variant="s2" className="text-typo col-span-5">
                    No item selected
                  </Typography>
                ) : (
                  readyToCheckout.map((item) => (
                    <React.Fragment key={item.id}>
                      <Typography variant="s2" className="text-typo col-span-2">
                        {item.product.name}
                      </Typography>
                      <Typography
                        variant="s2"
                        className="text-typo col-span-1 text-center"
                      >
                        {item.quantity}x
                      </Typography>
                      <Typography
                        variant="s2"
                        className="text-typo col-span-2 text-end"
                      >
                        {numberToCurrency(item.product.price * item.quantity)}
                      </Typography>
                    </React.Fragment>
                  ))
                )}
              </div>
              <hr className="border-typo-tertiary" />
              <div className="flex justify-between items-center">
                <Typography variant="s2" className="text-typo uppercase">
                  Total
                </Typography>
                <Typography
                  variant="h5"
                  className="text-typo col-span-2 text-end"
                >
                  {numberToCurrency(
                    readyToCheckout.reduce(
                      (acc, c) => acc + c.product.price * c.quantity,
                      0,
                    ),
                  )}
                </Typography>
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={readyToCheckout.length === 0}
                isLoading={processing}
              >
                Proceed Checkout
              </Button>
            </section>
          </form>
        </FormProvider>
      )}
    </AuthenticatedLayout>
  );
};

export default CartIndex;
