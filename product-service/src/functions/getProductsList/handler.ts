import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { ErrorMessage, Status } from "../../constants";
import { getJoinedTables } from "../../utils";
import { Product, Stock } from "../../types";
import { HttpResponse } from "@libs/responseTypes";

export const initGetProductsList = (getProducts: () => Promise<Product[]>, getStocks: () => Promise<Stock[]>) =>
  async (event: APIGatewayProxyEvent): Promise<HttpResponse> => {
    console.log('getProductsList called with event: ', event);
    try {
      const [products, stocks] = await Promise.all([
        getProducts(),
        getStocks(),
      ]);
      const productsInStock = getJoinedTables(products, stocks);
      if (productsInStock?.length) {
        return { statusCode: Status.Success, body: productsInStock };
      }

      return {
        statusCode: Status.Error,
        body: { message: `Products ${ErrorMessage.NotFound}` }
      }
    } catch (e: unknown) {
      console.error('getProductsList error', e);
      return {
        statusCode: 500,
        body: { message: e instanceof Error ? e.toString() : e },
      }
    }
  }
