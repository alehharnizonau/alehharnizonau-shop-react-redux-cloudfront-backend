import { getProductsList } from './handler';
import { products, productsInStockMock, stocks } from "../../data/data";
import { event, Status } from "../../constants";
import * as func from '../../providers';

describe('getProductsList handler', () => {
  it('should get successfully response', async () => {
    jest.spyOn(func.productProvider, 'getProducts').mockImplementation(() => Promise.resolve(products));
    jest.spyOn(func.stockProvider, 'getStocks').mockImplementation(() => Promise.resolve(stocks));
    const response = await getProductsList(event);
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Success);
    expect(body).toEqual(JSON.stringify(productsInStockMock));
  });
});