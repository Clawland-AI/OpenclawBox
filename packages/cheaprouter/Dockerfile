FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

ENV PORT=4000
ENV DEMO_MODE=true

EXPOSE 4000

CMD ["node", "src/index.js"]
