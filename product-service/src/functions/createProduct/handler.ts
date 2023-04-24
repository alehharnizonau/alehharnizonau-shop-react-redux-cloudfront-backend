import { Handler } from "aws-lambda";
import { isJson } from "../../utils";
import { ProductFull, ProductWithCount } from "../../types";
import { ErrorMessage, Status } from "../../constants";
import { v4 } from "uuid";
import { HttpResponse } from "@libs/responseTypes";

export const initCreateProduct = (putProducts: ({ title, description, price, id, count }: ProductFull) => Promise<{
  message: string;
  error?: undefined;
} | { error: string; message?: undefined; }>, uuid: typeof v4): Handler => async (event): Promise<HttpResponse> => {
  console.log('createProduct called with body: ', event.body);
  const data: ProductWithCount = isJson(event.body) ? JSON.parse(event.body as unknown as string) : event.body;
  try {
    const { title, description, count, price } = data;
    if (!title || !description || !count || !price) {
      return { statusCode: Status.InvalidData, body: { message: ErrorMessage.InvalidData } };
    }

    const product = { ...data, id: uuid() };
    const creationStatus = await putProducts(product);

    if (creationStatus.error) {
      return {
        statusCode: Status.ServerError,
        body: { message: ErrorMessage.ServerError, data: creationStatus.error }
      };
    }

    return {
      statusCode: Status.Success,
      body: { message: `${creationStatus.message}`, data: product }
    };

  } catch (e: unknown) {
    console.error('createProduct error', e);
    return {
      statusCode: 500,
      body: { message: e instanceof Error ? e.toString() : e },
    };
  }
}

