import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
  APIGatewayTokenAuthorizerHandler,
} from 'aws-lambda/trigger/api-gateway-authorizer';
import { generatePolicy } from "../../utils";

export function initBasicAuthorizer(): APIGatewayTokenAuthorizerHandler {
  return async function basicAuthorizer(
    event: APIGatewayTokenAuthorizerEvent
  ): Promise<APIGatewayAuthorizerResult> {
    console.log('basicAuthorizer is called with: ', event);

    if (event.type !== 'TOKEN') {
      return generatePolicy('Deny', event.methodArn);
    }
    try {
      const [, token] = event.authorizationToken.split(' ');

      const [login, password] = Buffer.from(token, 'base64').toString().split(':');

      console.log(`login: ${login}, password: ${password}`);

      if (
        process.env[login] !== undefined &&
        password !== undefined &&
        process.env[login] === password
      ) {
        console.log('Allowed');
        return generatePolicy('Allow', event.methodArn, token);
      } else {
        console.log('Denied');
        return generatePolicy('Deny', event.methodArn);
      }
    } catch (err) {
      console.log('basicAuthorizer failed with error ', err);
      return generatePolicy('Deny', event.methodArn);
    }
  };
}
