import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/Accordion";
import Badge from "@/Components/Badge";
import DatepickerFilter from "@/Components/DatepickerFilter";
import PopupFilter, { PopupFilterProps } from "@/Components/PopupFilter";
import Typography from "@/Components/Typography";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { cn, numberToCurrency } from "@/Lib/utils";
import { CartType } from "@/types/entities/cart";
import { CategoryType } from "@/types/entities/category";
import { TransactionType } from "@/types/entities/transaction";
import { Head, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { format, formatDate } from "date-fns";
import { Search, XCircle } from "lucide-react";
import * as React from "react";
import NotFound from "./container/NotFound";

type CategoryFilter = {
  category: string[];
};

type TransactionIndexProps = {
  transaction: TransactionType[];
  category: CategoryType[];
  categoryIds: string[];
  startDate: string;
  endDate: string;
};

type QueryType = {
  category_id: string[];
  start_date?: string;
  end_date?: string;
};

export default function TransactionIndex({
  transaction,
  category,
  categoryIds,
  startDate,
  endDate,
}: TransactionIndexProps) {
  const [filter, setFilter] = React.useState<string>("");
  const [filterDate, setFilterDate] = React.useState<Date[]>(
    [
      startDate ? new Date(startDate) : null,
      endDate ? new Date(endDate) : null,
    ].filter(Boolean) as Date[],
  );
  const [filterQuery, setFilterQuery] = React.useState<CategoryFilter>({
    category: categoryIds,
  });

  const prevCategory = React.useRef<string[]>(categoryIds);
  const prevDate = React.useRef<Date[]>(filterDate);

  const filterOption: PopupFilterProps<CategoryFilter>["filterOption"] =
    React.useMemo(
      () => [
        {
          id: "category",
          name: "Category",
          options: category,
        },
      ],
      [category],
    );

  const filteredTransaction = React.useMemo(() => {
    return transaction.filter((t) => {
      const matchesText = t.cart_product.some((cp) =>
        cp.product.name.toLowerCase().includes(filter.toLowerCase()),
      );
      return matchesText;
    });
  }, [transaction, filter]);

  const handleFilterChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(String(e.target.value));
    },
    [],
  );

  const handleClearFilter = React.useCallback(() => {
    setFilter("");
  }, []);

  React.useEffect(() => {
    if (
      JSON.stringify(filterQuery.category) !==
        JSON.stringify(prevCategory.current) ||
      (JSON.stringify(filterDate) !== JSON.stringify(prevDate.current) &&
        !(!filterDate[0] !== !filterDate[1]))
    ) {
      const query: QueryType = {
        category_id: filterQuery.category,
      };
      if (filterDate[0] && filterDate[1]) {
        query.start_date = formatDate(filterDate[0], "yyyy-MM-dd");
        query.end_date = formatDate(filterDate[1], "yyyy-MM-dd");
      }
      router.get("/history", query, {
        preserveState: true,
        preserveScroll: true,
      });
      prevCategory.current = filterQuery.category;
      prevDate.current = filterDate;
    }
  }, [filterQuery.category, filterDate]);

  const { auth } = usePage().props as unknown as {
    auth: {
      user: {
        name: string;
        email: string;
        role: string;
      } | null;
    };
  };

  return (
    <AuthenticatedLayout>
      <Head title="Order List" />
      <section className="px-10 md:px-20 py-8 flex flex-col gap-4">
        <Typography variant="h1" className="font-semibold">
          Order List
        </Typography>
        <div className="flex flex-col md:flex-row justify-between mt-6 gap-y-4">
          <div className="relative mt-1 self-start w-full md:w-fit">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="text-xl text-typo" />
            </div>
            <input
              type="text"
              value={filter ?? ""}
              onChange={handleFilterChange}
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
                  onClick={handleClearFilter}
                  className="p-1"
                >
                  <XCircle size={20} className="text-typo-icons" />
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <DatepickerFilter
              date={filterDate}
              setDate={setFilterDate}
              onResetFilter={() => setFilterDate([])}
            />
            <PopupFilter
              filterQuery={filterQuery}
              filterOption={filterOption}
              setFilterQuery={setFilterQuery}
              onResetFilter={() => setFilterQuery({ category: [] })}
            />
          </div>
        </div>
        {filteredTransaction.length === 0 ? (
          <NotFound />
        ) : (
          <div className="flex flex-col w-full gap-4">
            {filteredTransaction.map((t) => (
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
                  {auth.user?.role === "admin" && (
                    <>
                      <Typography variant="s3" className="text-typo-tertiary">
                        |
                      </Typography>
                      <Typography variant="s3" className="text-typo-secondary">
                        {t.cart_product[0].user.name}
                      </Typography>
                    </>
                  )}
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
                            className="text-primary-500 underline data-[state=open]:hidden"
                          >
                            Show more items
                          </Typography>
                        </AccordionTrigger>
                        <AccordionTrigger className="py-2" asChild>
                          <Typography
                            variant="s3"
                            className="text-primary-500 underline data-[state=closed]:hidden"
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
        )}
      </section>
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
      className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center"
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center col-span-2 md:col-span-3 lg:col-span-5">
        <img
          src={`/storage/${cp.product.image_url}`}
          alt={cp.product.name}
          className="size-28 md:size-20 object-fit rounded"
        />
        <div className="flex flex-col gap-2 w-full">
          <Typography variant="s2" className="text-typo">
            {cp.product.name}
          </Typography>
          <div className="flex gap-2">
            {cp.product.category.map((c) => (
              <Badge key={c.id} className="text-xs">
                {c.name}
              </Badge>
            ))}
          </div>
          <Typography variant="s3" className="text-typo-secondary">
            {quantity} item{quantity > 1 && "s"} x{" "}
            {numberToCurrency(cp.product.price)}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col col-span-1 ">
        <Typography variant="s3" className="text-typo-secondary text-wrap">
          Total Price
        </Typography>
        <Typography variant="s2" className="text-typo">
          {numberToCurrency(cp.product.price * cp.quantity)}
        </Typography>
      </div>
    </div>
  );
}
