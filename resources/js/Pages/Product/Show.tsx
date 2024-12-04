import Badge from "@/Components/Badge";
import Button from "@/Components/Button";
import ButtonLink from "@/Components/ButtonLink";
import Input from "@/Components/Forms/Input";
import IconButton from "@/Components/IconButton";
import Typography from "@/Components/Typography";
import UnstyledLink from "@/Components/UnstyledLink";
import Layout from "@/Layouts/Layout";
import { numberToCurrency } from "@/Lib/utils";
import { ProductType } from "@/types/entities/product";
import {
  Head,
  router,
  useForm as useFormInertia,
  usePage,
} from "@inertiajs/react";
import { ArrowLeft, MapPin, ShoppingCart } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type FormData = {
  product_id: string;
  quantity: number;
};

export default function Show({
  product,
  relatedProducts,
}: {
  product: ProductType;
  relatedProducts: ProductType[];
}) {
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
    if (!role) {
      toast.error("You must login first");
      router.get("/login");
      return;
    }

    post(route("cart.add", product.id), {
      onFinish: () => reset(),
      onError: (errors) => {
        toast.error(errors.message);
      },
    });
  };

  const { auth } = usePage().props as unknown as {
    auth: {
      user: {
        name: string;
        email: string;
        role: string;
      };
    };
  };
  const role = auth.user?.role;

  return (
    <Layout>
      <Head title="Detail Product" />
      <div className="px-10 md:px-10 py-8">
        <div>
          <ButtonLink href="/product" leftIcon={ArrowLeft}>
            Back
          </ButtonLink>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="flex flex-col lg:flex-row gap-2 items-center w-full">
            <div className="flex justify-center items-center">
              <img
                src={`/storage/${product.image_url}`}
                alt={product.name}
                className="w-1/2"
              />
            </div>
            <div className="bg-white rounded-lg p-8 flex flex-col gap-1 w-full">
              <div className="w-full">
                <Typography variant="j2" className="text-primary-500">
                  {product.name}
                </Typography>
              </div>
              <div className="w-full">
                <Typography variant="s1">
                  {numberToCurrency(product.price)}
                </Typography>
              </div>
              <div className="w-full">
                <Typography variant="b1" className="text-neutral-400">
                  {product.description}
                </Typography>
              </div>
              <div className="w-full">
                <Typography variant="b1">Stock: {product.stock}</Typography>
              </div>
              <div className="flex gap-2 items-center w-full">
                <MapPin width="20px" height="20px" />
                <Typography variant="b1">{product.city}</Typography>
              </div>
              <div className="flex gap-2">
                {product.category.map((c) => (
                  <Badge key={c.id}>{c.name}</Badge>
                ))}
              </div>
              {role !== "admin" && (
                <div className="flex items-center justify-center flex-col gap-2 mt-4">
                  <FormProvider {...methods}>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="gap-2 flex flex-row items-end w-full"
                    >
                      <Input
                        id="quantity"
                        type="number"
                        name="quantity"
                        label="Quantity"
                        placeholder="Input quantity"
                        containerClassName="w-full"
                        validation={{
                          required: "Quantity is required",
                          max: {
                            value: product.stock,
                            message:
                              "Quantity must be less than or equal to stock",
                          },
                        }}
                      />
                      <IconButton
                        type="submit"
                        disabled={processing}
                        className="w-fit h-fit"
                        icon={ShoppingCart}
                      />
                    </form>
                  </FormProvider>
                </div>
              )}
              {role === "admin" && (
                <div className="mt-4 flex items-center flex-row gap-2">
                  <ButtonLink
                    href={route("product.edit", product.id)}
                    openNewTab={false}
                    className="flex w-full"
                  >
                    Edit
                  </ButtonLink>
                  <Button
                    onClick={handleDelete}
                    className="flex w-full"
                    variant="outline"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <Typography variant="h2" className="text-secondary-800">
            Similar products
          </Typography>
          <Swiper
            modules={[A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            className="w-full py-[32px!important]"
          >
            {relatedProducts.map((p) => (
              <SwiperSlide key={p.id}>
                <UnstyledLink
                  href={route("product.show", p.id)}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-1"
                >
                  <img
                    src={`/storage/${p.image_url}`}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <Typography
                    variant="h2"
                    className="text-lg font-bold text-primary-500"
                  >
                    {p.name}
                  </Typography>
                  <Typography variant="s3" className="text-gray-600">
                    {p.description}
                  </Typography>
                  <Typography variant="s1" className="">
                    {numberToCurrency(p.price)}
                  </Typography>
                  <Typography variant="b1">Stock: {p.stock}</Typography>
                  <div className="flex gap-2 items-center w-full">
                    <MapPin width="20px" height="20px" />
                    <Typography variant="b1">{p.city}</Typography>
                  </div>
                  <div className="flex gap-2">
                    {p.category.map((c) => (
                      <Badge key={c.id}>{c.name}</Badge>
                    ))}
                  </div>
                </UnstyledLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Layout>
  );
}
