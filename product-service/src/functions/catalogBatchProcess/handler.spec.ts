import { initCatalogBatchProcess } from "./handler";
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Status } from "../../constants";
import { Context, SQSEvent } from "aws-lambda";
import { mockClient } from 'aws-sdk-client-mock';

describe('catalogBatchProcess', () => {
  const snsMock = mockClient(SNSClient);
  const product = {
    title: 'test-product',
    description: 'test-product-description',
    price: 20,
    count: 5,
  };
  const event = {
    Records: [
      {
        body: JSON.stringify({
          Message: JSON.stringify(product),
        }),
      }
    ]
  } as SQSEvent;

  it('should return 200 code with successfully result', async () => {
    const createProduct = () => Promise.resolve({ statusCode: Status.Success, message: `Successfully created items` });

    const { statusCode } = await initCatalogBatchProcess(createProduct, snsMock as unknown as SNSClient)(event, {} as Context, () => {
    });

    expect(statusCode).toBe(Status.Success);
  });

  it('should return 500 code with some errors in the creation products section', async () => {

    const createProduct = () => Promise.resolve({ statusCode: Status.ServerError, message: 'DynamoDB error' });

    const {
      statusCode,
      body
    } = await initCatalogBatchProcess(createProduct, snsMock as unknown as SNSClient)(event, {} as Context, () => {
    });

    expect(statusCode).toBe(Status.ServerError);
    expect(body.message).toBe('There are some errors in catalogBatchProcess function: Error: DynamoDB error');
  });

  it('should return 500 code with some error in publishing sns message', async () => {

    snsMock
      .on(PublishCommand)
      .rejects('SNS error')
    const createProduct = () => Promise.resolve({ statusCode: Status.Success, message: `Successfully created items` });

    const {
      statusCode,
      body
    } = await initCatalogBatchProcess(createProduct, snsMock as unknown as SNSClient)(event, {} as Context, () => {
    });

    expect(statusCode).toBe(Status.ServerError);
    expect(body.message).toBe('There are some errors in catalogBatchProcess function: Error: SNS error');
  });
});