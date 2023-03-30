import { handlerPath } from '@libs/handler-resolver';

export const getProductsList = {
	handler: `${handlerPath(__dirname)}/getProductsList/handler.getProductsList`,
	events: [
		{
			http: {
				method: 'get',
				path: 'products',
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
			},
		},
	],
};