import { Handler, SQSEvent } from "aws-lambda";
import { Status } from "../../constants";
import { HttpResponse } from "@libs/responseTypes";
import { CreationStatus, ProductWithCount } from "../../types";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

export const initCatalogBatchProcess = (createProduct: (product: ProductWithCount) => Promise<CreationStatus>, sns: SNSClient): Handler =>
  async (event: SQSEvent): Promise<HttpResponse> => {
    console.log('catalogBatchProcess called with event data: ', event.Records);

    for (const record of event.Records) {
      const data: ProductWithCount = JSON.parse(record.body);
      console.log('processing record ', data);
      try {
        const { statusCode, message } = await createProduct(data);
        if (statusCode !== Status.Success) {
          throw new Error(message)
        }
        console.log('Product successfully created: ', data);

        try {
          const input = {
            TopicArn: process.env.SNS_TOPIC_ARN,
            Message: `Hello! The imported product with the title '${data.title}' is created. The price of the product is ${data.price}`,
            Subject: `Product '${data.title}' is imported`,
            MessageAttributes: {
              price: {
                DataType: 'Number',
                StringValue: `${data.price}`
              }
            }
          };
          const command = new PublishCommand(input);
          await sns.send(command);
        } catch (e) {
          console.log('Failed to publish message to SNS with error:', e);
        }

      } catch (e) {
        console.log(`Failed to create product ${JSON.stringify(data)} with error ${e}`);
      }
    }

    return {
      statusCode: Status.Success,
    };
  }
