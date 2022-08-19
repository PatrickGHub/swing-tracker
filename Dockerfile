FROM node:16-alpine

WORKDIR /app

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --omit=dev

COPY . ./

CMD ["npm", "start"]