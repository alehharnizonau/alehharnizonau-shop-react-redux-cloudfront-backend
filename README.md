# React-shop-cloudfront-backend
___

This is backend part of starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Serverless](https://serverless.com/) as a serverless framework
- [serverless-auto-swagger](https://github.com/completecoding/serverless-auto-swagger) as a swagger endpoint generator
- [serverless-esbuild](https://www.serverless.com/plugins/serverless-esbuild) as a typeScript bundler
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool
- [jest](https://jestjs.io/) as testing framework
- [dotenv](https://github.com/motdotla/dotenv) as a a zero-dependency module that loads environment variables from a .env file into process.env
- [uuid](https://github.com/uuidjs/uuid) as a creator of RFC4122 UUIDs
- [json-schema-to-ts](https://github.com/bcherny/json-schema-to-typescript) as a compiler of json schemas to typescript typings
- [aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/) as AWS SDK for JavaScript S3 Client for Node.js
- [csv-parser](https://github.com/mafintosh/csv-parser) as a convertor CSV into JSON
- [middy/core](https://github.com/middyjs/middy) as a Node.js middleware engine for AWS Lambda
- [aws-sdk/s3-request-presigner](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_request_presigner.html) as a generator of signed url for S3
- [sinon](https://github.com/sinonjs/sinon) as a standalone and test framework for agnostic JavaScript test spies, stubs and mocks
- [aws-sdk/client-sns](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sns/) as a Simple Notification Service
- [aws-sdk/client-sqs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/) as a reliable, highly-scalable hosted queue for storing messages
- [aws-sdk-client-mock](https://www.npmjs.com/package/aws-sdk-client-mock) as a mocking library of AWS SDK v3 Clients.
___

# Backend

| Lambda          | Description            | Method | URL                                                                                                      |
| --------------- |------------------------| ------ |----------------------------------------------------------------------------------------------------------|
| getProductsList | get ALL products       | GET    | https://rb05wuzhm4.execute-api.us-east-1.amazonaws.com/dev/products                                    |
| getProductsById | get ONE product  by id | GET    | https://rb05wuzhm4.execute-api.us-east-1.amazonaws.com/dev/products/ff0dae18-9014-4946-82ee-e220e2ace9f9 |
| getProductsById | Product not found      | GET    | https://rb05wuzhm4.execute-api.us-east-1.amazonaws.com/dev/products/1                                    |
| createProduct | Product creation       | GET    | https://rb05wuzhm4.execute-api.us-east-1.amazonaws.com/dev/products                                      |
| importProductsFile | Product import         | GET    |  https://6gzvhb5guj.execute-api.us-east-1.amazonaws.com/dev/import                                     |

# Frontend

- Frontend integrated with product service HTTP API & images from S3 Bucket: [Link to cloudfront](https://d2umooc0fgw2y9.cloudfront.net/)

# Swagger

https://lupkpcixre.execute-api.us-east-1.amazonaws.com/swagger

# Available Scripts

To generate Swagger documentation use

```
npm run generate
```

To deploy use

```
npm run deploy
```

To run tests use

```
npm run test
```

To autofill tables with test examples

```
npm run autoFillTables
```