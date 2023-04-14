import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { productProvider, stockProvider } from "../../providers";
import { ErrorMessage, Status } from "../../constants";
import { getJoinedTables } from "../../utils";

export const getProductsList = (async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);
  try {
    const [products, stocks] = await Promise.all([
      productProvider.getProducts(),
      stockProvider.getStocks(),
    ]);
    const productsInStock = getJoinedTables(products, stocks);
    if (productsInStock?.length) {
      return formatJSONResponse({ statusCode: Status.Success, data: productsInStock });
    }
    return formatJSONResponse({
      statusCode: Status.Error,
      data: { message: `Products ${ErrorMessage.NotFound}`, data: [] }
    })
  } catch (e) {
    return formatJSONResponse({ statusCode: Status.ServerError, data: { message: ErrorMessage.ServerError, data: e } });
  }
})

