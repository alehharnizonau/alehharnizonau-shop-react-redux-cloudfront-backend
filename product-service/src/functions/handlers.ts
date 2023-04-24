import { middyfy } from '@libs/middlewares';
import { initCreateProduct } from "@functions/createProduct/handler";
import { initGetProductsList } from "@functions/getProductsList/handler";
import { initGetProductsById } from "@functions/getProductsById/handler";
import { initCatalogBatchProcess } from "@functions/catalogBatchProcess/handler";
import { productProvider, stockProvider } from "../providers";

export const createProduct = middyfy(
  initCreateProduct(productProvider.createProduct)
);

export const getProductsList = middyfy(
  initGetProductsList(productProvider.getProducts, stockProvider.getStocks)
)

export const getProductsById = middyfy(
  initGetProductsById(productProvider.getProductById, stockProvider.getStockById)
)

export const catalogBatchProcess = initCatalogBatchProcess(productProvider.createProduct);

