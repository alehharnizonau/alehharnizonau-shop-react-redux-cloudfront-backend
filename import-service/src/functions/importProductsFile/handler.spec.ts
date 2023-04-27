import { S3Client } from '@aws-sdk/client-s3';
import { initImportProductsFile } from "./handler";
import { APIGatewayEventRequestContextWithAuthorizer } from "aws-lambda";
import sinon from 'sinon';
import * as getSignedUrl from '../../utils';

describe('importProductsFile', () => {
  const config = {
    credentials: {
      accessKeyId: 'test',
      secretAccessKey: 'test',
    },
    region: 'test-1'
  }
  const s3 = new S3Client(config);
  const bucket = 'test-bucket'
  const event = {
    body: ``,
    headers: {},
    httpMethod: "GET",
    isBase64Encoded: false,
    path: "/",
    queryStringParameters: { name: 'test.csv' },
    pathParameters: {},
    stageVariables: {},
    multiValueHeaders: {},
    requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<{}>,
    resource: "/",
    multiValueQueryStringParameters: {}
  }

  it('should return 200 code if signed url was generated successfully', async () => {
    const signedUrl = "https://test-bucket/test.csv";
    const stub = sinon.stub(getSignedUrl, 'getSignedUrl')
      .callsFake(async () => {
        return signedUrl;
      });

    const result = await initImportProductsFile(s3, bucket)(event);

    expect(stub.calledOnce).toBeTruthy();
    expect(result).toStrictEqual({
      statusCode: 200,
      body: signedUrl,
    });
  });

  it('should return 500 code if no filename is provided', async () => {
    const eventWithoutFile = { ...event, queryStringParameters: {} }

    const result = await initImportProductsFile(s3, bucket)(eventWithoutFile);

    expect(result).toStrictEqual({
      statusCode: 500,
      body: { message: 'Error: "name" query string parameter is required' }
    });
  });
});