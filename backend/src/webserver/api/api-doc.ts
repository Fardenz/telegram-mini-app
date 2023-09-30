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
    Game: {
      type: "object",
      properties: {
        result: {
          type: "number",
        },
      },
      required: ["result"],
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
    },
    ['/game']: {
      post: {
        operationId: 'postGame',
        consumes: ['application/json'],
        parameters: [{
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              choice: {
                type: "number",
              },
              type: {
                type: "string",
                enum: ['dice', 'coinflip']
              },
            },
            required: ["choice", "type"],
          }
        }],
        responses: {
          [200]: {
            description: 'play game',
            schema: {
              $ref: "#/definitions/Game",
            }
          }
        }
      }
    }
  },
};

module.exports = apiDoc;