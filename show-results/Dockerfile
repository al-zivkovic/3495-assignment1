FROM node:14.5.0-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8004

CMD ["node", "app.js"]
