import { S3Client } from "@aws-sdk/client-s3";
import { SQSClient } from "@aws-sdk/client-sqs";
import { initImportProductsFile } from './importProductsFile/handler';
import { initImportFileParser } from './importFileParser/handler';
import { middyfy } from '@libs/middlewares';

const {
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  SESSION_TOKEN,
  S3_BUCKET
} = process.env;

const configuration = () => Promise.resolve({
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    sessionToken: SESSION_TOKEN
  },
  region: REGION,
})

const s3 = new S3Client(configuration);
const sqsClient = new SQSClient(configuration);

export const importProductsFile = middyfy(
  initImportProductsFile(s3, S3_BUCKET)
);

export const importFileParser = initImportFileParser(s3, S3_BUCKET, sqsClient);
