import { initGetProductsById } from './handler';
import { productsInStockMock, stocks } from "../../data/data";
import { ErrorMessage, event, Status } from "../../constants";

describe('getProductsById handler', () => {
  it('should get successfully response', async () => {
    const getProductbyId = () => Promise.resolve(productsInStockMock[0]);
    const getStockById = () => Promise.resolve(stocks[0]);
    const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
    const currentEvent = {
      ...event, pathParameters: {
        productId
      }
    }
    const response = await initGetProductsById(getProductbyId, getStockById)(currentEvent);
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Success);
    expect(body).toEqual(productsInStockMock[0]);
  });

  it('should get 404 error', async () => {
    const getProductbyId = () => Promise.resolve(undefined);
    const getStockById = () => Promise.resolve(undefined);
    const currentEvent = {
      ...event, pathParameters: {
        productId: '1'
      }
    }
    const response = await initGetProductsById(getProductbyId, getStockById)(currentEvent);
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Error);
    expect(body).toEqual({ message: `Product ${ErrorMessage.NotFound}`});
  });
});