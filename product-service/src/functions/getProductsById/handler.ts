import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { productProvider } from "../../providers/product-provider";
import { formatJSONResponse } from "@libs/api-gateway";
import { ErrorMessage, Status } from "../../constants";

export const getProductsById = (async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const productId = event.pathParameters?.productId;
    const product = await productProvider.getProductById(productId);
    if (product) {
      return formatJSONResponse({ statusCode: Status.Success, data: product });
    }
    return formatJSONResponse({ statusCode: Status.Error, data: { message: `Product ${ErrorMessage.NotFound}` } })
  } catch (e) {
    return formatJSONResponse({ statusCode: Status.ServerError, data: { message: ErrorMessage.ServerError, data: e } });
  }
})

