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
___

# Backend

| Lambda          | Description                   | Method | URL                                                                                                      |
| --------------- |-------------------------------| ------ |----------------------------------------------------------------------------------------------------------|
| getProductsList | get ALL products              | GET    | https://rb05wuzhm4.execute-api.us-east-1.amazonaws.com/dev/products                                    |
| getProductsById | get ONE product  by id | GET    | https://rb05wuzhm4.execute-api.us-east-1.amazonaws.com/dev/products/ff0dae18-9014-4946-82ee-e220e2ace9f9 |
| getProductsById | Product not found             | GET    | https://rb05wuzhm4.execute-api.us-east-1.amazonaws.com/dev/products/1                                    |
| createProduct | Product creation              | GET    | https://rb05wuzhm4.execute-api.us-east-1.amazonaws.com/dev/products                                      |

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