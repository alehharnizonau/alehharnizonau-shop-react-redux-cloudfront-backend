import { APIGatewayEventRequestContextWithAuthorizer } from "aws-lambda/common/api-gateway";

export enum Status {
  Success = 200,
  InvalidData = 400,
  Error = 404,
  ServerError = 500
}

export enum ErrorMessage {
  NotFound = 'not found',
  ServerError = 'Internal server error',
  InvalidData = 'Invalid data'
}

export const pathApi = 'rb05wuzhm4.execute-api.us-east-1.amazonaws.com'

export const event = {
  body: ``,
  headers: {},
  httpMethod: "GET",
  isBase64Encoded: false,
  path: "/",
  queryStringParameters: {},
  pathParameters: {},
  stageVariables: {},
  multiValueHeaders: {},
  requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<{}>,
  resource: "/",
  multiValueQueryStringParameters: {}
}