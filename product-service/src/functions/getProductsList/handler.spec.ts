import { getProductsList } from './handler';
import { products } from "../../data/data";
import { Status } from "../../constants";

describe('getProductsList handler', () => {
  it('should get successfully response', async () => {
    const response = await getProductsList();
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Success);
    expect(body).toEqual(JSON.stringify(products));
  });


});