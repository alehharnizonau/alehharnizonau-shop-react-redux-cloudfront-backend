import { handlerPath, pathUp } from '@libs/handler-resolver';

export const importProductsFile = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.importProductsFile`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: {
                required: true
              }
            }
          }
        },
        authorizer: {
          arn: 'arn:aws:lambda:us-east-1:523175524473:function:authorization-service-dev-basicAuthorizer',
          type: 'token',
          name: 'basicAuthorizer',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
        },
      },
    },
  ],
};
