FROM node:18

WORKDIR /api

RUN apt-get update && apt-get install -y wget
COPY package.json package-lock.json* .env /api/

RUN npm ci
RUN chown -R node:node .
USER node

CMD npm run start