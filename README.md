Telegram Bot

## How to set it up in local

npx localtunnel --port 3333

npx localtunnel --port 4000


cd backend \
 && echo `BOT_TOKEN=66....
TELEGRAM_FRONTEND=localtunnel result url` > .env\
 &&  npm i \
 && npm run start

cd frontend && npm i && npm run dev

cada cambio de back & front se sube
front en github pages

<!-- ABOUT THE PROJECT -->

## About the Project
_insert vid like cal_

### Overview
_brief overview of the coding contest and the purpose of your solution_

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites
- Node.js (Version: >=16.x)
- npm
- Docker
- MongoDB

_list any prerequisites or dependencies that users need to have installed on their machines_

## Development

### Setup 

1. Clone the repo into a public GitHub repository (or fork https://github.com/calcom/cal.com/fork).

    ```sh
   git clone https://github.com/Fardenz/telegram-mini-app.git
   ```
    
   > If you are on Windows, run the following command on `gitbash` with admin privileges: <br> > `git clone -c core.symlinks=true https://github.com/Fardenz/telegram-mini-app` <br>

2. Set up the Backend [here](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/README.md). 

3. Set up Frontend [here](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/README.md)


## Solution Overview (_can connect to In-Depth Explanation Section?_)

GitHub Actions

### Code Structure (_explain the organization of your code, detailing the purpose of each major component or module_)

#### Backend

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
      
### Code Structure (_explain the organization of your code, detailing the purpose of each major component or module_)

#### Frontend

The frontend of the Telegram mini-app is structured as follows:

1. Configuration Files:
   - [`.eslintrc.js`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/.eslintrc.js): ESLint configuration to identify and report code errors, bugs, and non-standard patterns.
   - [`.prettierrc`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/.prettierrc): Prettier configuration to ensure consistent code formatting across files, overriding any stylistic choices to maintain uniformity.
  
2. Docker & Deployment:
   - [`Dockerfile`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/Dockerfile): Docker configuration for the frontend.
   - [`docker-compose.yml`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/docker-compose.yml): Docker Compose configuration.

3. Main Application:
   - [`App.tsx`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/App.tsx): Main App component that wraps around other components and views - It sets up the main layout, routing, and global state.
   - [`main.tsx`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/main.tsx): Main entry point for the frontend application - It initializes the React app and renders the main App component.
  
4. Components:
   - [`CoinFlip`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/components/CoinFlip/index.tsx): CoinFlip game component represents a game where users can flip a coin - It includes the game logic, UI, and interactions.
   - [`Dice`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/components/Dice/index.tsx): Dice game component represents a dice game - It includes functionalities like rolling the dice, displaying outcomes, and managing game states.
   - [`WalletModal`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/components/Wallet/WalletModal.tsx): Wallet modal component is utilized for the user's wallet - It displays the user's balance, transaction history, and provide options to make transactions.
  
5. Services:
   - [`auth.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/services/auth.ts): Authentication services - It includes functions for logging in, logging out, and managing user sessions.
   - [`games.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/services/games.ts): Game-related services/operations - It includes functions for starting games, fetching game data, and handling game outcomes.
   - [`wallet.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/services/wallet.ts): Wallet-related services/operations - It includes functions for checking balance, making transactions, and managing user wallets.
  
6. Views:
   - [`Home`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/views/Home/index.tsx): Main landing page/dashboard of the application - It displays an overview of the app, user stats, and quick access to features.
   - [`Coinflip`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/views/Games/Coinflip/index.tsx): Coinflip game view - It provides options to play the game, view outcomes, and manage game states.
   - [`Dice`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/views/Games/Dice/index.tsx): Dice game view - It provides options to play the game, view outcomes, and manage game states.

### Architecture 

#### Backend

1. Configuration Management:

The backend uses configuration files ([`custom-environment-variables.js`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/custom-environment-variables.js) and [`default.js`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/default.js) to manage environment-specific settings. This allows for flexibility in deploying the application in different environments without changing the code.

2. Dependency Injection:

The presence of [`inversify.config.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/inversify.config.ts) suggests the use of Inversion of Control (IoC) through dependency injection, promoting decoupling and making the code more maintainable and testable.

3. Telegram Bot Integration:

A dedicated module [`telegramBot`](https://github.com/Fardenz/telegram-mini-app/tree/main/backend/src/telegramBot) handles Telegram bot functionalities, indicating a clear separation of concerns and modularity.






## In-Depth Explanation

### Main Components
_break down the major components of your solution with detailed explanations_

### Algorithms and Data Structures
_describe the algorithms and data structures used in your solution_

### Code Samples
_include snippets of code to illustrate key points_

## Error Handling

### Common Errors
_list potential errors that users may encounter and explain how to troubleshoot them_

### Exception Handling
_detail how your solution handles exceptions gracefully_

## Recap
_summarize the key points covered in the documentation?_

## Next Steps/Roadmap
_roadmap project for a list of proposed features (and known issues)_




