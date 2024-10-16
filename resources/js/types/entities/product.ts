export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  city: string;
  category: {
    id: number;
    name: string;
  }[];
  image_url: File | string | Blob | null;
};
