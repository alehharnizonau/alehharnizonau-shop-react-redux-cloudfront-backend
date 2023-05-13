import { handlerPath, pathUp } from "@libs/handler-resolver";

export const basicAuthorizer = {
  handler: `${pathUp(handlerPath(__dirname), 1)}/handlers.basicAuthorizer`,
};
