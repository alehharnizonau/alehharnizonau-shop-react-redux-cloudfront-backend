import { Handler } from "aws-lambda";
import { isJson } from "../../utils";
import { CreationStatus, ProductWithCount } from "../../types";
import { Status } from "../../constants";
import { HttpResponse } from "@libs/responseTypes";

export const initCreateProduct = (createProduct: (product: ProductWithCount) => Promise<CreationStatus>): Handler => async (event): Promise<HttpResponse> => {
  console.log('createProduct called with body: ', event.body);
  const data: ProductWithCount = isJson(event.body) ? JSON.parse(event.body as unknown as string) : event.body;
  try {
    const { statusCode, message } = await createProduct(data);

    return {
      statusCode,
      body: message
    };
  } catch (e: unknown) {
    console.error('createProduct error', e);
    return {
      statusCode: Status.ServerError,
      body: { message: e instanceof Error ? e.toString() : e },
    };
  }
}

