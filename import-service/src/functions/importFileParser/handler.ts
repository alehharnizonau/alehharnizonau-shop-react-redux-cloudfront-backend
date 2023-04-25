import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3Event } from 'aws-lambda';
import csvParser from 'csv-parser';
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

export const initImportFileParser = (s3: S3Client, bucket: string, sqsClient: SQSClient) =>
  async (event: S3Event) => {
    console.log('initImportFileParser triggered with event:', event);
    try {
      await Promise.all(
        event.Records.map(async (record) => {
            const filePath = record.s3.object.key;
            console.log('processing file:', filePath);
            const params = {
              Bucket: bucket,
              Key: filePath,
            };
            const getCommand = new GetObjectCommand(params);
            const copyCommand = new CopyObjectCommand({
              Bucket: bucket,
              Key: filePath.replace('uploaded', 'parsed'),
              CopySource: `${bucket}/${filePath}`,
            });
            const deleteCommand = new DeleteObjectCommand(params);

            const s3ResponseStream = (await s3.send(getCommand)).Body as NodeJS.ReadableStream;

            await new Promise((resolve, reject) => {
              s3ResponseStream
                .pipe(csvParser({ separator: ";" }))
                .on('data', async (data) => {
                  console.log('Processing data: ', data);
                  try {
                    const params = {
                      QueueUrl: process.env.SQS_QUEUE,
                      MessageBody: JSON.stringify(data),
                    }
                    await sqsClient.send(new SendMessageCommand(params))
                  } catch (e) {
                    console.log(`Failed to send product data to queue with error ${e}`);
                  }
                })
                .on('error', (error) => {
                  console.log('Stream error: ', error);
                  reject();
                })
                .on('end', async () => {
                  await s3.send(copyCommand);
                  await s3.send(deleteCommand);
                  console.log(`End of the stream`);
                  resolve(null);
                });
            });
          }
        )
      )
      return {
        statusCode: 200
      };
    } catch (e) {
      console.log('importFileParser is failed with error ', e);
      return {
        statusCode: 500,
        body: { message: e instanceof Error ? e.toString() : e },
      };
    }
  };
