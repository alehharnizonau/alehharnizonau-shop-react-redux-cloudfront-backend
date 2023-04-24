import { DynamoDB } from "aws-sdk";
import { Product, ProductFull, ProductWithCount, Stock } from "../types";
import { ErrorMessage, Status } from "../constants";
import { v4 } from "uuid";

const { DYNAMO_DB_PRODUCTS, DYNAMO_DB_STOCKS } = process.env;

export const productProvider = {
  getProducts: async () => {
    try {
      const db = new DynamoDB.DocumentClient();
      const { Items: products } = await db.scan({
        TableName: DYNAMO_DB_PRODUCTS
      }).promise();
      return products as Product[];
    } catch (err) {
      console.error(`DynamoDB error: ${err}`);
    }
  },
  getProductById: async (id?: string) => {
    try {
      const db = new DynamoDB.DocumentClient();
      const params = {
        TableName: DYNAMO_DB_PRODUCTS,
        Key: { id }
      };
      const response = await db.get(params).promise();
      return response.Item as Product;
    } catch (err) {
      console.error(`DynamoDB error: ${err}`);
    }
  },
  putProductWithStock: async ({ title, description, price, id, count }: ProductFull) => {
    try {
      const db = new DynamoDB.DocumentClient();
      const productsParams = {
        TableName: DYNAMO_DB_PRODUCTS,
        Item: {
          id,
          title,
          description,
          price
        }
      };
      const stockParams = {
        TableName: DYNAMO_DB_STOCKS,
        Item: {
          product_id: id,
          count
        }
      };

      await db.transactWrite({
        TransactItems: [
          {
            Put: productsParams
          },
          {
            Put: stockParams
          }
        ],
      }).promise();
      return { statusCode: Status.Success, message: `Successfully created items` };
    } catch (err) {
      return { statusCode: Status.ServerError, message: `DynamoDB error: ${err}` }
    }
  },
  createProduct: async (product: ProductWithCount) => {
    const { title, description, count, price } = product;
    if (!title || !description || !count || !price) {
      return { statusCode: Status.Error, message: ErrorMessage.InvalidData };
    }

    const newProduct = { ...product, id: v4() };
    const creationStatus = await productProvider.putProductWithStock(newProduct);

    const { statusCode, message } = creationStatus;
    return { statusCode, message }
  }
}

export const stockProvider = {
  getStocks: async () => {
    try {
      const db = new DynamoDB.DocumentClient();
      const { Items: stocks } = await db.scan({
        TableName: DYNAMO_DB_STOCKS
      }).promise();
      return stocks as Stock[]
    } catch (err) {
      console.error(`DynamoDB error: ${err}`);
    }
  },
  getStockById: async (product_id?: string) => {
    try {
      const db = new DynamoDB.DocumentClient();
      const params = {
        TableName: DYNAMO_DB_STOCKS,
        Key: { product_id }
      };
      const response = await db.get(params).promise();
      return response.Item as Stock;
    } catch (err) {
      console.error(`DynamoDB error: ${err}`);
    }
  }
}