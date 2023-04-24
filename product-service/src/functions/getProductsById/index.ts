import { handlerPath, pathUp } from "@libs/handler-resolver";

export const getProductsById = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.getProductsById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        cors: true,
        responses: {
          200: {
            description: 'Successfully obtained product',
            bodyType: 'ProductInStock'
          },
          404: {
            description: 'Product not found',
          },
          500: {
            description: 'Internal server error',
          }
        }
      },
    },
  ],
};