export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  city: string;
  image_url: File | string | null;
};
