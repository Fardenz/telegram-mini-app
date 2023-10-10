## Frontend Setup

1. Navigate to the Frontend directory:

   ```sh
   cd telegram-mini-app/frontend
   ```

2. Set up your `.env` file:
   
   Duplicate `.env.example` to `.env`:

   ```sh
   cp .env.example .env
   ```

3.  Edit the `.env` file:

    Open the [`env/.env`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/env/.env.example) file in your preferred text editor. Adjust the environment variables as per your requirements.

4. Install the required packages:

   ```sh
   npm install
   ```
    
5. Execute the frontend in your local machine:

   ```sh
   npm run dev
   ```

6. To expose your frontend to the internet you can use:
   
   ```sh
   npx localtunnel --port 4000
   ```

## Deployment

Build the Docker Container:
   
```sh
docker-compose up 
```

## How to

<details>
   
<summary>Route mapping</summary>

Update the [`tsconfig.json`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/tsconfig.json) and [`tsconfig.vite.json`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/tsconfig.vite.json) to use the new path aliases, just like all the rest.

</details>

<details>
   
<summary>Adding a new view</summary>
   
1. Create a new route in [`paths.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/src/router/paths.ts).
2. Add the route to the router. If a header is needed, ensure to include the `MainLayout` component.
3. Create the view in the `views` folder.

</details>
<details>
   
<summary>Create environments</summary>

- Development: File .env.development on env folder.
- Production: File .env.production on env folder.

Create these two files and copy the info of the .env.example file.

</details>

## Code Structure

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

