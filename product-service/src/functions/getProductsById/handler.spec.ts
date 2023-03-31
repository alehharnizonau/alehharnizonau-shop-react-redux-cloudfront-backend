import { getProductsById } from './handler';
import { APIGatewayEventRequestContextWithAuthorizer } from "aws-lambda/common/api-gateway";
import { products } from "../../data/data";
import { ErrorMessage, Status } from "../../constants";

const event = {
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

describe('getProductsById handler', () => {
  it('should get successfully response', async () => {
    const currentEvent = {
      ...event, pathParameters: {
        productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'
      }
    }
    const response = await getProductsById(currentEvent);
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Success);
    expect(body).toEqual(JSON.stringify(products[0]));
  });

  it('should get 404 error', async () => {
    const currentEvent = {
      ...event, pathParameters: {
        productId: '1'
      }
    }
    const response = await getProductsById(currentEvent);
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Error);
    expect(body).toEqual(JSON.stringify({ message: `Product ${ErrorMessage.NotFound}` }));
  });
});