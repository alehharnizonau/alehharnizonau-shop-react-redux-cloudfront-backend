import { middyfy } from '@libs/middlewares';
import { initCreateProduct } from "@functions/createProduct/handler";
import { initGetProductsList } from "@functions/getProductsList/handler";
import { initGetProductsById } from "@functions/getProductsById/handler";
import { initCatalogBatchProcess } from "@functions/catalogBatchProcess/handler";
import { productProvider, stockProvider } from "../providers";
import { SNSClient } from "@aws-sdk/client-sns";


const {
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  SESSION_TOKEN,
} = process.env;

const configuration = () => Promise.resolve({
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    sessionToken: SESSION_TOKEN
  },
  region: REGION,
})

const sns = new SNSClient(configuration);

export const createProduct = middyfy(
  initCreateProduct(productProvider.createProduct)
);

export const getProductsList = middyfy(
  initGetProductsList(productProvider.getProducts, stockProvider.getStocks)
)

export const getProductsById = middyfy(
  initGetProductsById(productProvider.getProductById, stockProvider.getStockById)
)

export const catalogBatchProcess = initCatalogBatchProcess(productProvider.createProduct, sns);

