FROM node:18

WORKDIR /api

RUN apt-get update && apt-get install -y wget
COPY package.json package-lock.json* .env /api/

RUN npm ci
RUN chown -R node:node .
USER node

COPY . .
EXPOSE 3333

CMD npm run start