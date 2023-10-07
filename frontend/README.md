## Frontend Setup

1. Navigate to the Frontend directory:

   ```sh
   cd telegram-mini-app/frontend
   ```

2. Set up your `.env` file:
   
   - Duplicate `.env.example` to `.env`

    ```sh
   cp .env.example .env
   ```

3.  Edit the `.env` file:

    - Open the [`env/.env`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/env/.env.example) file in your        preferred text editor. Adjust the environment variables as per your requirements.

4. Install the required packages:

    ```sh
   npm install
   ```
    - Route mapping: update the [`tsconfig.json`](https://github.com/Fardenz/telegram-mini-                  
      app/blob/main/frontend/tsconfig.json) and [`tsconfig.vite.json`](https://github.com/Fardenz/telegram-mini- 
      app/blob/main/frontend/tsconfig.vite.json) to use the new path aliases, just like all the rest.

    - Adding a new view:
      1. Create a new route in [`paths.ts`](https://github.com/Fardenz/telegram-mini- 
         app/blob/main/frontend/src/router/paths.ts).
      2. Add the route to the router. If a header is needed, ensure to include the `MainLayout` component.
      3. Create the view in the `views` folder.

5. Build the Docker Container:
   
     ```sh
   npm run dev
   ```
  
6. Build the app for production:

   ```sh
   npm run build
   ```


---------------------------------------------------------------




## Summary

@ Route mapping -> Update tsconfig.json and tsconfig.vite.json, just like all the rest, to use the new path aliases. 

### Add new view 

Routing handler in /routes: 
  -  Create new route in paths.ts
  -  add route to router, if header needed ensure to include the MainLayout component
  -  Create view in views folder
  -  And thats it, happy coding!

## Usage
### Build the docker container
  make build
### Start serving the aplication 
  make start
### Stop serving the aplication
  make stop
### Remove the docker container
  make down
### Run all tests
  make test
### Exec always before commit
  make before-commit

## Environments

- Development: File .env.development on env folder.
- Production: File .env.production on env folder.

Create this two files and copy the info of the .env.example file
