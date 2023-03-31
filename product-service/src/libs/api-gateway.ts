import { ResponseTypes } from "../types/api-types";

export const formatJSONResponse = ({ statusCode, data }: { statusCode: number, data: ResponseTypes }) => (
  {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': '*'
    }
  })
