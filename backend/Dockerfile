FROM node:18

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["node", "dist/index.js"]