FROM node:14.5.0-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY index.js ./

COPY style.css ./

EXPOSE 3001

CMD ["node", "start"]
