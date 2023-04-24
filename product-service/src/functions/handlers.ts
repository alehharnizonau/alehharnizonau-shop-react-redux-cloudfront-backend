import { middyfy } from '@libs/middlewares';
import { initCreateProduct } from "@functions/createProduct/handler";
import { initGetProductsList } from "@functions/getProductsList/handler";
import { initGetProductsById } from "@functions/getProductsById/handler";
import { productProvider, stockProvider } from "../providers";
import { v4 } from "uuid";

export const createProduct = middyfy(
  initCreateProduct(productProvider.putProductWithStock, v4)
);

export const getProductsList = middyfy(
  initGetProductsList(productProvider.getProducts, stockProvider.getStocks)
)

export const getProductsById = middyfy(
  initGetProductsById(productProvider.getProductById, stockProvider.getStockById)
)
