FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .

RUN npx prisma generate \
    && npm run build

EXPOSE ${PORT}
CMD [ "node", "dist/main.js" ]
