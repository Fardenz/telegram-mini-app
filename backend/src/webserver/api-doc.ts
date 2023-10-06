import { OpenAPIV3 } from "openapi-types";

const apiDoc: OpenAPIV3.Document = {
  openapi: "3.0.1",
  info: {
    title: "Telegram web app API.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "//localhost:3333/",
    },
  ],
  paths: {
    "/wallet": {
      get: {
        operationId: "getWallet",
        responses: {
          200: {
            description: "get wallet",
            content: {
              "*/*": {
                schema: {
                  $ref: "#/components/schemas/Wallet",
                },
              },
            },
          },
        },
      },
      post: {
        operationId: "postWithdrawMoney",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                required: ["amountInCents", "iban"],
                type: "object",
                properties: {
                  iban: {
                    type: "string",
                  },
                  amountInCents: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "withdraw money from wallet",
            content: {
              "*/*": {
                schema: {
                  $ref: "#/components/schemas/Wallet",
                },
              },
            },
          },
        },
      },
    },
    "/game": {
      post: {
        operationId: "postGame",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                required: ["choice", "type"],
                type: "object",
                properties: {
                  choice: {
                    maxItems: 3,
                    minItems: 1,
                    uniqueItems: true,
                    type: "array",
                    items: {
                      type: "number",
                      enum: [1, 2, 3, 4, 5, 6], 
                    },
                  },
                  type: {
                    type: "string",
                    enum: ["dice", "coinflip"],
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "play game",
            content: {
              "*/*": {
                schema: {
                  $ref: "#/components/schemas/Game",
                },
              },
            },
          },
        },
      },
    },
    "/payment/link": {
      get: {
        operationId: "getPaymentLink",
        parameters: [
          {
            name: "amount",
            in: "query",
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "Payment link successfully retrieved.",
            content: {
              "*/*": {
                schema: {
                  type: "object",
                  properties: {
                    telegramId: {
                      type: "string",
                      example: "123456789",
                    },
                    url: {
                      type: "string",
                      example: "http://example.com/payment-link",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "*/*": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Query param 'amount' required!",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
            content: {
              "*/*": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "An unexpected error occurred.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Wallet: {
        required: ["amountInCents"],
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          amountInCents: {
            type: "string",
          },
        },
      },
      Game: {
        required: ["result"],
        type: "object",
        properties: {
          result: {
            type: "number",
          },
        },
      },
    },
  },
}

module.exports = apiDoc;