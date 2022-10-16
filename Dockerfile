# Base image
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn prisma migrate deploy

RUN yarn start:dev