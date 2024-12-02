import { CartType } from "./cart";

export type TransactionType = {
  id: string;
  total_price: number;
  cart_product: CartType[];
  created_at: Date;
};
