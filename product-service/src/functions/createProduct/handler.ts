import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { productProvider } from "../../providers";
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { ErrorMessage, Status } from "../../constants";
import schema from "@functions/createProduct/schema";
import { v4 } from 'uuid';
import { isJson } from "../../utils";
import { ProductWithCount } from "../../types";

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = (async (event): Promise<APIGatewayProxyResult> => {
  console.log(event.body);
  const data: ProductWithCount = isJson(event.body) ? JSON.parse(event.body as unknown as string) : event.body;
  try {
    const { title, description, count, price } = data;
    if (!title || !description || !count || !price) {
      return formatJSONResponse({ statusCode: Status.InvalidData, data: { message: ErrorMessage.InvalidData } });
    }
    const product = { ...data, id: v4() };
    const creationStatus = await productProvider.putProductWithStock(product);

    if (creationStatus.error) {
      return formatJSONResponse({
        statusCode: Status.ServerError,
        data: { message: ErrorMessage.ServerError, data: creationStatus.error }
      });
    }

    return formatJSONResponse({
      statusCode: Status.Success,
      data: { message: `${creationStatus.message}`, data: product }
    });
  } catch (e) {
    return formatJSONResponse({ statusCode: Status.ServerError, data: { message: ErrorMessage.ServerError, data: e } });
  }
})

