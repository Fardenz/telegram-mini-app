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
      Open the [`env/.env`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/.env.example) file in your preferred text editor. Adjust the environment variables as per your requirements. Read more on the Configuration section
   

3. Build the Docker Container:
   

     ```sh
   npm install
   ```
4. Build the Docker Container:
   

     ```sh
   npm run start
   ```


### Configuration

The backend configuration can be found [here](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/default.js). This file contains various settings such as the bot token, frontend endpoint, MongoDB configurations, and other environment-specific settings. 

Some of these default settings will get overwritten by the environment variables defined in the `.env` file, you have this file as a reference of the values [.env.example](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/.env.example).

The rules that define which environment variables are overwritten are at https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/custom-environment-variables.js

Ensure you adjust these settings as per your requirements. 

