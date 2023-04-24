
import { products, productsInStockMock, stocks } from "../../data/data";
import { event, Status } from "../../constants";
import { initGetProductsList } from "./handler";

describe('getProductsList handler', () => {
  it('should get successfully response', async () => {
    const getProducts = () => Promise.resolve(products);
    const getStocks = () => Promise.resolve(stocks);
    const response = await initGetProductsList(getProducts, getStocks)(event);
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Success);
    expect(body).toEqual(productsInStockMock);
  });
});