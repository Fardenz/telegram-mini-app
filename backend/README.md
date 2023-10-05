## Usage
### Build the docker container
  make build
### Start serving the application 
  make start
### Stop serving the application
  make stop
### Remove the docker container
  make down
### Exec always before commit
  make before-commit

## Backend Setup

1. Navigate to the Backend Directory:

    ```sh
   cd telegram-mini-app/backend
   ```

2. Set up your `.env` file:
   
   - Duplicate `.env.example` to `.env`

    ```sh
   cp env/.env.example env/.env
   ```

    - Edit the `.env` File:
      Open the [`env/.env`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/.env.example) file in your preferred text editor. Adjust the environment variables as per your requirements.
   

3. Build the Docker Container:
   
   The backend uses Docker to ensure a consistent environment. Build the Docker container using the following command:

     ```sh
   make build
   ```

4. Start Serving the Application:
   
   The backend uses Docker to ensure a consistent environment. Build the Docker container using the following command:

     ```sh
   make start
   ```

5. Execute Before Commit
   
   The backend uses Docker to ensure a consistent environment. Build the Docker container using the following command:

     ```sh
   make before-commit
   ```

### Configuration

The backend configuration can be found [here](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/default.js). This file contains various settings such as the bot token, frontend endpoint, MongoDB configurations, and other environment-specific settings. Ensure you adjust these settings as per your requirements.
