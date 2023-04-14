import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler, } from 'aws-lambda';
import type { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { DataError, ProductInStock, ProductsInStock } from "../types/api-types";

type ValidatedAPIGatewayProxyEvent<S extends JSONSchema> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S extends JSONSchema> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

type ResponseType = ProductInStock | ProductsInStock | DataError<[] | {} | unknown> | { message: string };

export const formatJSONResponse = ({ statusCode, data }: {
  statusCode: number,
  data: ResponseType
}) => (
  {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': '*'
    }
  })
