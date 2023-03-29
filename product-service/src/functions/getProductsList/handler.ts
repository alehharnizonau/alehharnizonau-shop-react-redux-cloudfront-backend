import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import {getProducts} from "../../providers/product-provider";


export const getProductsList = (async (): Promise<APIGatewayProxyResult> => {
    try {
        const products = getProducts();
        if (products.length) {
            return formatJSONResponse({statusCode: 200, data: products});
        }
        return formatJSONResponse({statusCode: 404, data: []})
    }
    catch (e) {
        return formatJSONResponse({statusCode: 500, data: e});
    }
})

