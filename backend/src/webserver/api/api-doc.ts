import { OpenAPIV2 } from "openapi-types";

const apiDoc: OpenAPIV2.Document = {
  swagger: "2.0",
  basePath: "/",
  info: {
    title: "Telegram web app API.",
    version: "1.0.0",
  },
  definitions: {
    Wallet: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        amount: {
          type: "string",
        },
      },
      required: ["telegramId", "amount"],
    },
  },
  paths: {
    ['/wallet']: {
      get: {
        operationId: 'getWallet',
        responses: {
          [200]: {
            description: 'get wallet',
            schema: {
              $ref: "#/definitions/Wallet",
            }
          }
        }
      }
    }
  },
};

module.exports = apiDoc;