FROM node:14.5.0-alpine3.12

WORKDIR /app

COPY app/package.json .
COPY app/index.js .
COPY app/public/style.css public/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
