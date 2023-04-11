import { Product, Stock } from "../types";
import { ProductsInStock } from "../types/api-types";

export const products: Product[] = [
  {
    description: "Short Product Description 1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "ProductTest1",
  }
];

export const stocks: Stock[] = [
  {
    product_id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    count: 6,
  }
];

export const productsInStockMock: ProductsInStock = [
  {
    description: "Short Product Description 1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "ProductTest1",
    count: 6
  },
];