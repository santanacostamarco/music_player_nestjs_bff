FROM node:22.17.1 AS builder

WORKDIR /app

COPY ./src ./src
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./nest-cli.json ./nest-cli.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.build.json ./tsconfig.build.json

RUN npm i
