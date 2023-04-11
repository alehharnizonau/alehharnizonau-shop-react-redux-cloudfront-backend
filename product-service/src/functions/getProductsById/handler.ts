import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { productProvider, stockProvider } from "../../providers";
import { formatJSONResponse } from "@libs/api-gateway";
import { ErrorMessage, Status } from "../../constants";

export const getProductsById = (async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);
  try {
    const productId = event.pathParameters?.productId;
    const [product, stock] = await Promise.all([
      productProvider.getProductById(productId),
      stockProvider.getStockById(productId),
    ]);
    if (product) {
      return formatJSONResponse({ statusCode: Status.Success, data: { ...product, count: stock?.count } });
    }
    return formatJSONResponse({
      statusCode: Status.Error,
      data: { message: `Product ${ErrorMessage.NotFound}`, data: {} }
    })
  } catch (e) {
    return formatJSONResponse({ statusCode: Status.ServerError, data: { message: ErrorMessage.ServerError, data: e } });
  }
})

