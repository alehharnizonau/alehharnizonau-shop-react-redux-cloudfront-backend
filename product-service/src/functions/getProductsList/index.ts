import { handlerPath, pathUp } from "@libs/handler-resolver";

export const getProductsList = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.getProductsList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        responses: {
          200: {
            description: 'Successfully obtained list of products',
            bodyType: 'ProductsInStock'
          },
          404: {
            description: 'Products not found',
          },
          500: {
            description: 'Internal server error',
          }
        }
      },
    },
  ],
};