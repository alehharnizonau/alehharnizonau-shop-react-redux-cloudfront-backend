import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { productProvider } from "../../providers/product-provider";
import { ErrorMessage, Status } from "../../constants";

export const getProductsList = (async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = await productProvider.getProducts();
    if (products.length) {
      return formatJSONResponse({ statusCode: Status.Success, data: products });
    }
    return formatJSONResponse({
      statusCode: Status.Error,
      data: { message: `Products ${ErrorMessage.NotFound}`, data: [] }
    })
  } catch (e) {
    return formatJSONResponse({ statusCode: Status.ServerError, data: { message: ErrorMessage.ServerError, data: e } });
  }
})

