## Backend Setup

1. Navigate to the Backend Directory:

    ```sh
   cd telegram-mini-app/backend
   ```

2. Set up your `.env` file:
   
   - Duplicate `.env.example` to `.env`

    ```sh
   cp .env.example .env
   ```
    - Edit the `.env` File:
      Open the [`env/.env`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/.env.example) file in your 
      preferred text editor. Adjust the environment variables as per your requirements.

3. Install the required packages:
   
     ```sh
   npm install
   ```
4. Build the Docker Container:
   
     ```sh
   npm run start
   ```
5. To expose your backend to the internet you can use 
  ```sh
   npx localtunnel --port 3333
   ```

### Configuration

The backend uses configuration files ([`custom-environment-variables.js`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/custom-environment-variables.js) and [`default.js`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/default.js) to manage environment-specific settings. This file contains various settings such as the bot token, frontend endpoint, MongoDB configurations, and other environment-specific settings. This allows for flexibility in deploying the application in different environments without changing the code.

The backend configuration can be found [here](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/default.js). 

Some of these default settings will get overwritten by the environment variables defined in the `.env` file, you have this file as a reference of the values [.env.example](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/.env.example).

The rules that define which environment variables are overwritten are at https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/custom-environment-variables.js

Ensure you adjust these settings as per your requirements. 


### Architecture 

1. Dependency Injection:

For further developments you will want to keep maintaining [`inversify.config.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/inversify.config.ts). These file configure the Inversion of Control (IoC) through dependency injection, promoting decoupling and making the code more maintainable and testable. 

2. Telegram Bot Integration:

A dedicated module [`telegramBot`](https://github.com/Fardenz/telegram-mini-app/tree/main/backend/src/telegramBot) handles Telegram bot functionalities, indicating a clear separation of concerns and modularity.

2. Webserver:

The second biggest module is the [`webserver`](https://github.com/Fardenz/telegram-mini-app/tree/main/backend/src/webserver) it handles all the calls coming from the web app. It also handles the authentication with Telegram and the API documentation.


### Code Structure
The backend of the Telegram mini-app is structured as follows:

1. Configuration files:
  - [`.env.example`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/.env.example): Example environment variables.
  - [`.eslintrc.js`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/.eslintrc.js): ESLint configuration to identify and report code errors, bugs, and non-standard patterns.
   - [`.prettierrc`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/.prettierrc): Prettier configuration to ensure consistent code formatting across files, overriding any stylistic choices to maintain uniformity.

2. Docker & Deployment:
   - [`Dockerfile`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/Dockerfile): Docker configuration for the backend.
   - [`docker-compose.yml`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/docker-compose.yml): Docker Compose configuration.

3. Telegram Bot
   - [`index.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/telegramBot/index.ts): Main entry for the Telegram bot functionality - It initializes the bot, sets up command handlers and manages bot interactions.
   - [`paymentHandle.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/telegramBot/paymentHandle.ts): Handles Telegram bot payment-related functionalities - It processes payments, verifies transactions and manages payment callbacks.

4. Web Server
    - [`index.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/webserver/index.ts): Main entry for the web server - It sets up the server, routes, middleware, and other essential configurations.
    - [`api-doc.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/webserver/api-doc.ts): API documentation - It uses tools like Swagger to provide interactive documentation for the backend APIs.
    - [`telegramAuth.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/webserver/telegramAuth.ts): Telegram user authentication for the web server - It includes functionalities like OAuth, token generation, and user verification.

5. API Endpoints:
   - [`gameHandlers.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/webserver/api/paths/game/gameHandlers.ts): Game-related API handlers - It includes creating games, managing game states, and handling game outcomes.
   - [`walletHandlers.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/webserver/api/paths/wallet/walletHandlers.ts): Wallet-related API handlers - It includes functionalities like checking balances, making transactions, and managing user wallets.

 6. Models:
    - [`User.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/models/User.ts): User model - It defines the structure, attributes, and methods related to user data.

