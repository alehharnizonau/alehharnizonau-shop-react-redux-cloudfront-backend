import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { ErrorMessage, Status } from "../../constants";
import { Product, Stock } from "../../types";
import { HttpResponse } from "@libs/responseTypes";

export const initGetProductsById = (getProductById: (id?: string) => Promise<Product>, getStockById: (product_id?: string) => Promise<Stock>) =>
  async (event: APIGatewayProxyEvent): Promise<HttpResponse> => {
    console.log('getProductsById called with event: ', event);
    try {
      const productId = event.pathParameters?.productId;
      const [product, stock] = await Promise.all([
        getProductById(productId),
        getStockById(productId),
      ]);
      if (product) {
        return { statusCode: Status.Success, body: { ...product, count: stock?.count } };
      }

      return {
        statusCode: Status.Error,
        body: { message: `Product ${ErrorMessage.NotFound}` }
      }
    } catch (e: unknown) {
      console.error('getProductsById error', e);
      return {
        statusCode: 500,
        body: { message: e instanceof Error ? e.toString() : e },
      }
    }
  }

