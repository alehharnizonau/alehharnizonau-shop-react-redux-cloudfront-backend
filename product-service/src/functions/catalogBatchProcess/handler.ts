import { Handler, SQSEvent } from "aws-lambda";
import { Status } from "../../constants";
import { HttpResponse } from "@libs/responseTypes";
import { CreationStatus, ProductWithCount } from "../../types";

export const initCatalogBatchProcess = (createProduct: (product: ProductWithCount) => Promise<CreationStatus>): Handler => async (event: SQSEvent): Promise<HttpResponse> => {
  console.log('catalogBatchProcess called with event data: ', event.Records);

  for (const record of event.Records) {
    const data = JSON.parse(record.body);
    console.log('processing record ', data);
    try {
      const { statusCode, message } = await createProduct(data);
      if (statusCode !== Status.Success) {
        throw new Error(message)
      }
      console.log('Product successfully created: ', data);
    } catch (e) {
      console.log(`Failed to create product ${JSON.stringify(data)} with error ${e}`);
    }
  }

  return {
    statusCode: Status.Success,
  };
}
