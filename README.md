# React-shop-cloudfront-backend
___

This is backend part of starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Serverless](https://serverless.com/) as a serverless framework
- [serverless-auto-swagger](https://github.com/completecoding/serverless-auto-swagger) as a swagger endpoint generator
- [serverless-esbuild](https://www.serverless.com/plugins/serverless-esbuild) as a typeScript bundler
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool
- [jest](https://jestjs.io/) as testing framework
___

# Backend

| Lambda          | Description                   | Method | URL                                                                                                      |
| --------------- | ----------------------------- | ------ |----------------------------------------------------------------------------------------------------------|
| getProductsList | get ALL products              | GET    | https://qq1272e6fd.execute-api.us-east-1.amazonaws.com/dev/products                                      |
| getProductsById | get ONE product in JSON by id | GET    | https://qq1272e6fd.execute-api.us-east-1.amazonaws.com/dev/products/7567ec4b-b10c-45c5-9345-fc73c48a80a1 |
| getProductsById | Product not found             | GET    | https://qq1272e6fd.execute-api.us-east-1.amazonaws.com/dev/products/1                                    |

# Frontend

- Frontend integrated with product service HTTP API & images from S3 Bucket: [Link to cloudfront](https://d2umooc0fgw2y9.cloudfront.net/)

# Swagger

https://j6ygerj4b7.execute-api.us-east-1.amazonaws.com/swagger

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