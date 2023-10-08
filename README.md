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

Read on the deployment section more information about our setup.

_list any prerequisites or dependencies that users need to have installed on their machines_

## Development

### Setup 

1. Clone the repo into a public GitHub repository (or fork https://github.com/Fardenz/telegram-mini-app/fork).

    ```sh
   git clone https://github.com/Fardenz/telegram-mini-app.git
   ```
    
   > If you are on Windows, run the following command on `gitbash` with admin privileges: <br> > `git clone -c core.symlinks=true https://github.com/Fardenz/telegram-mini-app` <br>

2. Set up Frontend [here](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/README.md)
3. Set up the Backend [here](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/README.md). 


## Solution Overview (_can connect to In-Depth Explanation Section?_)

### Deployment

#### Database
We're using [`MongoDB Atlas`](https://www.mongodb.com/atlas/database) to host our database. In our case it's free and allows us to scale easily.

#### GitHub Actions

We're using Github Actions as our CI/CD tool. You can find the configuration in `.github/workflows/`, whenever a push is made to the `main` branch, the workflow will be triggered, deploying the latest code.

<details>
<summary>Backend</summary>
The backend is automatically deployed to a custom server owned by us running Linux. We use docker to package the code so it's easier to spin multiple copies, isolate instances and deploy the minimum amount of code.

You can set your custom secrets in the repository settings and it will automatically deploy to your server. The secrets are:

```
SSH_HOST
SSH_PRIVATE_KEY
SSH_USERNAME
ENV_VARIABLES
```

You can find the configuration in `.github/workflows/staging-deployment-backend.yml`
</details>

<details>
<summary>Frontend</summary>
We're using Github Pages to deploy the frontend, this allows us to have a public URL with HTTPS for the web app without having to pay for a server. The disadvantage is that you can only host static webpages. To deploy it automatically configure your github pages in the repository settings and set the `ENV_VARIABLES_FRONTEND` secret.

You can find the configuration in `.github/workflows/staging-deployment-frontend.yml`
</details>

### Architecture 

You can also check [`an in depth explanation of the backend architecture`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/README.md#Code-Structure)

#### Backend

1. Configuration Management:

The backend uses configuration files ([`custom-environment-variables.js`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/custom-environment-variables.js) and [`default.js`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/default.js) to manage environment-specific settings. This allows for flexibility in deploying the application in different environments without changing the code.

2. Dependency Injection:

The presence of [`inversify.config.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/inversify.config.ts) suggests the use of Inversion of Control (IoC) through dependency injection, promoting decoupling and making the code more maintainable and testable.

3. Telegram Bot Integration:

A dedicated module [`telegramBot`](https://github.com/Fardenz/telegram-mini-app/tree/main/backend/src/telegramBot) handles Telegram bot functionalities, indicating a clear separation of concerns and modularity.

### Code Structure (_explain the organization of your code, detailing the purpose of each major component or module_)

#### Backend
https://github.com/Fardenz/telegram-mini-app/blob/main/backend/README.md#Code-Structure
      
#### Frontend
https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/README.md#Code-Structure

## Error Handling

### Common Errors
_list potential errors that users may encounter and explain how to troubleshoot them_

Most of the expected requests will be on the Swagger file, so you can test them there. If you are using Postman, you can import the Swagger file and use the requests from there.

<details>
<summary>Requests stated in Swagger are not working correctly</summary>
Ensure that you have the correct URL in the `.env` file. The URL should be the same as the one you used to expose your backend to the internet. Also make sure that the protocol is the correct one, so `http` for local.

</details>

<details>
<summary>Web app is only accessible through Telegram by https and in a public url</summary>
You will have to use a service like ngrok or localtunnel to expose your local web app to the internet. Then, you will have to change the `TELEGRAM_FRONTEND` variable in the `.env` file to the URL provided by the service. Make sure that the protocol is the correct one, so `https` for ngrok.
</details>


### Exception Handling
_detail how your solution handles exceptions gracefully_

## Next Steps/Roadmap
_roadmap project for a list of proposed features (and known issues)_




