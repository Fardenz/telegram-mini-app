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
        amountInCents: {
          type: "string",
        },
      },
      required: ["telegramId", "amountInCents"],
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
      },
      post: {
        operationId: 'postWithdrawMoney',
        consumes: ['application/json'],
        parameters: [{
          in: 'body',
          name: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              iban: {
                type: "string",
              },
              amountInCents: {
                type: "string",
              },
            },
            required: ["iban", "amountInCents"],
          }
        }],
        responses: {
          [200]: {
            description: 'withdraw money from wallet',
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
    },
    ["/payment/link"]: {
      get: {
        operationId: 'getPaymentLink',
        parameters: [
          {
            in: "query",
            name: "amount",
            type: "number"
          }
        ],
        responses: {
          [200]: {
            description: "Payment link successfully retrieved.",
            schema: {
              type: "object",
              properties: {
                telegramId: {
                  type: "string",
                  example: "123456789"
                },
                url: {
                  type: "string",
                  example: "http://example.com/payment-link"
                }
              }
            }
          },
          [400]: {
            description: "Bad Request",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Query param 'amount' required!"
                }
              }
            }
          },
          [500]: {
            description: "Internal Server Error",
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "An unexpected error occurred."
                }
              }
            }
          }
        }
      }
    },
  },
};

module.exports = apiDoc;