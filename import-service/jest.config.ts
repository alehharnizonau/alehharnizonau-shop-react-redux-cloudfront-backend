export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    "^@libs/(.*)$": "<rootDir>/src/libs/$1"
  },
};