import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/Accordion";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { numberToCurrency } from "@/Lib/utils";
import { CartType } from "@/types/entities/cart";
import { TransactionType } from "@/types/entities/transaction";
import { Head } from "@inertiajs/react";
import { format } from "date-fns";

export default function TransactionIndex({
  transaction,
}: { transaction: TransactionType[] }) {
  return (
    <AuthenticatedLayout>
      <Head title="Order List" />
      {transaction.length === 0 ? (
        <>beli dulu sana</>
      ) : (
        <section className="px-10 md:px-20 py-8 flex flex-col gap-4">
          <Typography variant="h1" className="font-semibold">
            Order List
          </Typography>
          <div className="flex flex-col w-full gap-4">
            {transaction.map((t) => (
              <div
                key={t.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-6"
              >
                <div className="flex gap-2 items-center">
                  <Typography variant="b3">
                    {format(new Date(t.created_at), "dd MMMM yyyy")}
                  </Typography>
                  <Typography variant="s3" className="text-typo-tertiary">
                    |
                  </Typography>
                  <Typography variant="s3" className="text-typo-secondary">
                    TR/{format(new Date(t.created_at), "yyyyMMdd")}/{t.id}
                  </Typography>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <ProductItems
                    cart_product={t.cart_product[0]}
                    quantity={t.cart_product[0].quantity}
                  />
                  {t.cart_product.length > 1 && (
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem
                        value="cart-product"
                        className="border-none"
                      >
                        <AccordionContent>
                          {t.cart_product.map(
                            (cp, index) =>
                              index !== 0 && (
                                <ProductItems
                                  key={cp.id}
                                  cart_product={cp}
                                  quantity={cp.quantity}
                                />
                              ),
                          )}
                        </AccordionContent>
                        <AccordionTrigger className="py-2" asChild>
                          <Typography
                            variant="s3"
                            className="text-typo data-[state=open]:hidden"
                          >
                            Show more items
                          </Typography>
                        </AccordionTrigger>
                        <AccordionTrigger className="py-2" asChild>
                          <Typography
                            variant="s3"
                            className="text-typo data-[state=closed]:hidden"
                          >
                            Show less items
                          </Typography>
                        </AccordionTrigger>
                      </AccordionItem>
                    </Accordion>
                  )}
                  <div className="w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-9 gap-4 items-center">
                    <div className="flex gap-4 items-center col-span-1 md:col-span-3 lg:col-span-6 xl:col-span-7" />
                    <div className="flex col-span-2 gap-1 items-center">
                      <Typography variant="s3" className="text-typo-secondary">
                        Grand Total:
                      </Typography>
                      <Typography variant="s2">
                        {numberToCurrency(t.total_price)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </AuthenticatedLayout>
  );
}

type ProductItemsProps = {
  cart_product: CartType;
  quantity: number;
};

function ProductItems({ cart_product: cp, quantity }: ProductItemsProps) {
  return (
    <div
      key={cp.id}
      className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center"
    >
      <div className="flex gap-4 items-center col-span-2 md:col-span-3 lg:col-span-5">
        <img
          src={`/storage/${cp.product.image_url}`}
          alt={cp.product.name}
          className="size-20 object-fit rounded"
        />
        <div className="flex flex-col gap-1 w-full">
          <Typography variant="s2" className="text-typo">
            {cp.product.name}
          </Typography>
          <Typography variant="s3" className="text-typo-secondary">
            {quantity} item{quantity > 1 && "s"} x{" "}
            {numberToCurrency(cp.product.price)}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col col-span-1">
        <Typography variant="s3" className="text-typo-secondary">
          Total Price
        </Typography>
        <Typography variant="s2" className="text-typo">
          {numberToCurrency(cp.product.price * cp.quantity)}
        </Typography>
      </div>
    </div>
  );
}
