import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3"
import { initImportProductsFile } from './importProductsFile/handler';
import { initImportFileParser } from './importFileParser/handler';
import { middyfy } from '@libs/lambda';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  SESSION_TOKEN,
  S3_BUCKET
} = process.env;

const s3Configuration: S3ClientConfig = () => Promise.resolve({
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    sessionToken: SESSION_TOKEN
  },
  region: REGION,
})

const s3 = new S3Client(s3Configuration);

export const importProductsFile = middyfy(
  initImportProductsFile(s3, S3_BUCKET)
);

export const importFileParser = initImportFileParser(s3, S3_BUCKET);
