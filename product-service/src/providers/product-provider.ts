import { products } from "../data/data";

export const productProvider = {
  getProducts: () => Promise.resolve(products),
  getProductById: (id: string) => Promise.resolve(products.find(product => product.id === id))
}