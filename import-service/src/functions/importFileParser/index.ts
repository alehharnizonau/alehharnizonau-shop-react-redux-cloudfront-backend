import { handlerPath, pathUp } from '@libs/handler-resolver';
import * as dotenv from 'dotenv';

dotenv.config();

export const importFileParser = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.importFileParser`,
  events: [
    {
      s3: {
        bucket: process.env.S3_BUCKET,
        event: "s3:ObjectCreated:*",
        rules: [
          {
            prefix: 'uploaded/'
          },
          {
            suffix: '.csv'
          }
        ],
        existing: true,
      },
    },
  ],
};