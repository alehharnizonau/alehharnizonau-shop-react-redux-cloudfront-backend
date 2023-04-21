import middy from "@middy/core"
import httpCors from "@middy/http-cors"
import httpErrorHandler from "@middy/http-error-handler"
import httpEventNormalizer from "@middy/http-event-normalizer"
import httpHeaderNormalizer from "@middy/http-header-normalizer"
import httpJsonBodyParser from "@middy/http-json-body-parser"
import httpResponseSerializer from "@middy/http-response-serializer"
import { Handler } from "aws-lambda"

export const middyfy = (handler: Handler) => {
  return middy(handler)
    .use(httpHeaderNormalizer({ canonical: true }))
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(httpCors())
    .use(
      httpResponseSerializer({
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
        ],
        defaultContentType: 'application/json',
      })
    )
    .use(httpErrorHandler());
}
