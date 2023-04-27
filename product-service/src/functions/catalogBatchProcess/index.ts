import { handlerPath, pathUp } from "@libs/handler-resolver";

export const catalogBatchProcess = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.catalogBatchProcess`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: {
          'Fn::GetAtt': ['sqsQueue', 'Arn'],
        },
      },
    },
  ],
};