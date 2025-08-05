FROM node:22.17.1 AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit-dev

FROM node:22.17.1 AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN npm run build

FROM node:22.17.1 AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]



