import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@libs/handler-resolver";
import { APIGatewayProxyEvent } from 'aws-lambda';

export const initImportProductsFile = (s3: S3Client, bucketName: string) =>
  async (event: APIGatewayProxyEvent) => {
    console.log('importProductsFile is called');
    try {
      const { name } = event.queryStringParameters;
      if (!event.queryStringParameters || !name) {
        throw new Error(`"name" query string parameter is required`);
      }
      console.log('importProductsFile is called with ', name);
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `uploaded/${name}`
      });
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
      console.log('Presigned URL: ', signedUrl);

      return {
        statusCode: 200,
        body: signedUrl,
      };
    } catch (e) {
      console.log('importProductsFile is failed with error ', e);
      return {
        statusCode: 500,
        body: { message: e instanceof Error ? e.toString() : e },
      };
    }
  };


