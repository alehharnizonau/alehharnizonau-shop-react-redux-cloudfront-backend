import { Product, Stock } from "../types";

export const getJoinedTables = (products: Product[] = [], stocks: Stock[] = []) => products.map(product => {
  const stock = stocks.find(s => s.product_id === product.id)
  return {
    ...product, count: stock?.count
  }
})

export const isJson = (data: any) => {
  try {
    const testIfJson = JSON.parse(data);
    return typeof testIfJson === "object"
  } catch {
    return false;
  }
};
