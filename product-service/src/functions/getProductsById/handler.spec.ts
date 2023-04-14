import { getProductsById } from './handler';
import { productsInStockMock, stocks } from "../../data/data";
import { ErrorMessage, event, Status } from "../../constants";
import * as func from "../../providers";

describe('getProductsById handler', () => {
  it('should get successfully response', async () => {
    const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
    jest.spyOn(func.productProvider, 'getProductById').mockImplementation(() => Promise.resolve(productsInStockMock[0]));
    jest.spyOn(func.stockProvider, 'getStockById').mockImplementation(() => Promise.resolve(stocks[0]));
    const currentEvent = {
      ...event, pathParameters: {
        productId
      }
    }
    const response = await getProductsById(currentEvent);
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Success);
    expect(body).toEqual(JSON.stringify(productsInStockMock[0]));
  });

  it('should get 404 error', async () => {
    jest.spyOn(func.productProvider, 'getProductById').mockImplementation(() => Promise.resolve(undefined));
    jest.spyOn(func.stockProvider, 'getStockById').mockImplementation(() => Promise.resolve(undefined));
    const currentEvent = {
      ...event, pathParameters: {
        productId: '1'
      }
    }
    const response = await getProductsById(currentEvent);
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Error);
    expect(body).toEqual(JSON.stringify({ message: `Product ${ErrorMessage.NotFound}`, data: {} }));
  });
});