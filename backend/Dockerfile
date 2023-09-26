FROM node:18

WORKDIR /api

COPY package.json package-lock.json* /api/

RUN npm install
RUN chown -R node:node .
USER node

CMD npm run start