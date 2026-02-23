FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

ENV FLEET_PORT=4100

EXPOSE 4100

CMD ["node", "src/index.js"]
