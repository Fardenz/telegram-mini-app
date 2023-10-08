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
https://github.com/Fardenz/telegram-mini-app/blob/main/backend/README.md#Code-Structure
      
#### Frontend
https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/README.md#Code-Structure

### Architecture 

You can also check [`an in depth explanation of the backend architecture`](https://github.com/Fardenz/telegram-mini-app/blob/main/frontend/README.md#Code-Structure)

#### Backend

1. Configuration Management:

The backend uses configuration files ([`custom-environment-variables.js`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/custom-environment-variables.js) and [`default.js`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/config/default.js) to manage environment-specific settings. This allows for flexibility in deploying the application in different environments without changing the code.

2. Dependency Injection:

The presence of [`inversify.config.ts`](https://github.com/Fardenz/telegram-mini-app/blob/main/backend/src/inversify.config.ts) suggests the use of Inversion of Control (IoC) through dependency injection, promoting decoupling and making the code more maintainable and testable.

3. Telegram Bot Integration:

A dedicated module [`telegramBot`](https://github.com/Fardenz/telegram-mini-app/tree/main/backend/src/telegramBot) handles Telegram bot functionalities, indicating a clear separation of concerns and modularity.


## Error Handling

### Common Errors
_list potential errors that users may encounter and explain how to troubleshoot them_

### Exception Handling
_detail how your solution handles exceptions gracefully_

## Next Steps/Roadmap
_roadmap project for a list of proposed features (and known issues)_




