import { handlerPath } from '@libs/handler-resolver';
import schema from "@functions/createProduct/schema";

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

export const createProduct = {
  handler: `${handlerPath(__dirname)}/createProduct/handler.createProduct`,
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

export const dynamoDBInit = {
  handler: `${handlerPath(__dirname)}/dynamoDBInit/handler.dynamoDBInit`,
};