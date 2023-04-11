import type { AWS } from '@serverless/typescript';
import { createProduct, dynamoDBInit, getProductsById, getProductsList } from "@functions/handlers";
import { pathApi } from "./src/constants";
import * as dotenv from 'dotenv';

dotenv.config();

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    profile: 'Aleh_Harnizonau',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DYNAMO_DB_PRODUCTS: process.env.DYNAMO_DB_PRODUCTS,
      DYNAMO_DB_STOCKS: process.env.DYNAMO_DB_STOCKS
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:*",
          ],
          Resource: [
            { "Fn::GetAtt": ["ProductsTable", "Arn"] },
            { "Fn::GetAtt": ["StocksTable", "Arn"] },
          ],
        }],
      },
    },
  },
  functions: { getProductsList, getProductsById, dynamoDBInit, createProduct },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      host: pathApi,
      basePath: '/dev'
    }
  },
  resources: {
    Resources: {
      ProductsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:provider.environment.DYNAMO_DB_PRODUCTS}",
          AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
        }
      },
      StocksTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:provider.environment.DYNAMO_DB_STOCKS}",
          AttributeDefinitions: [{
            AttributeName: "product_id",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "product_id",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
        }
      },
    }
  }
};

module.exports = serverlessConfiguration;
