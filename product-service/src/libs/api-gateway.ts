import { DataError, Product, Products } from "../types/api-types";

type ResponseType = Product | Products | DataError<[] | {} | unknown>;

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
