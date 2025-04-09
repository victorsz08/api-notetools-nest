FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .
RUN npx prisma generate
RUN npm run build

# Agora, nova imagem apenas com o necessário pra produção
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY .env .env

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
