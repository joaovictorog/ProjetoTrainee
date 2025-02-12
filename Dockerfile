ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine

ENV "NODE_ENV"=production

WORKDIR /app/usr/src

COPY package*.json ./

RUN npm install

USER root

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

EXPOSE 3030

CMD ["npm", "start"]
