export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  city: string;
  categories: number[];
  image_url: File | string | Blob | null;
};
