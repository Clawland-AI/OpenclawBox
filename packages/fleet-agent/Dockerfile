FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

ENV FLEET_SERVER_URL=http://fleet-server:4100

CMD ["node", "src/index.js"]
