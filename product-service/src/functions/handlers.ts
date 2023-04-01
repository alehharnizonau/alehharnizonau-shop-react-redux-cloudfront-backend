import { handlerPath } from '@libs/handler-resolver';

export const getProductsList = {
  handler: `${handlerPath(__dirname)}/getProductsList/handler.getProductsList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        responses: {
          200: {
            description: 'Successfully obtained list of products',
            bodyType: 'Products'
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

export const getProductsById = {
  handler: `${handlerPath(__dirname)}/getProductsById/handler.getProductsById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        cors: true,
        responses: {
          200: {
            description: 'Successfully obtained product',
            bodyType: 'Product'
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