import { APIGatewayAuthorizerResult } from "aws-lambda/trigger/api-gateway-authorizer";

export function generatePolicy(
  effect: 'Allow' | 'Deny',
  resource: string,
  principalId = '1'
): APIGatewayAuthorizerResult {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: effect, Action: 'execute-api:Invoke', Resource: resource
        }
      ],
    },
  };
}