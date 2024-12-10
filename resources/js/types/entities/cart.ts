import { ProductType } from "./product";

export type CartType = {
  id: number;
  product_id: string;
  quantity: number;
  product: ProductType;
  user: {
    id: string;
    name: string;
  };
};
