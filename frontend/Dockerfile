FROM node:18

WORKDIR /app

COPY package.json package-lock.json* /app/

RUN npm install
RUN chown -R node:node .
USER node

CMD npm run dev