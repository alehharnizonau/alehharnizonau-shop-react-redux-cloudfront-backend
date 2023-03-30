import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayProxyEvent } from "aws-lambda/trigger/api-gateway-proxy";
import { productProvider } from "../../providers/product-provider";

export const getProductsById = (async (event: APIGatewayProxyEvent) => {
	try {
		const { productId } = event.pathParameters;
		const product = await productProvider.getProductById(productId);
		if (product) {
			return formatJSONResponse({ statusCode: 200, data: product });
		}
		return formatJSONResponse({ statusCode: 404, data: {} })
	} catch (e) {
		return formatJSONResponse({ statusCode: 500, data: e });
	}
})

