import { handlerPath, pathUp } from "@libs/handler-resolver";
import schema from "@functions/createProduct/schema";

export const createProduct = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.createProduct`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
        responses: {
          200: {
            description: 'Successfully created product',
            bodyType: 'ProductBody'
          },
          400: {
            description: 'Product data is invalid',
          },
          500: {
            description: 'Internal server error',
          }
        },
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};