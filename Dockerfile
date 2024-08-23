FROM node:18-alpine as builder

WORKDIR /src/app

COPY package*.json ./

RUN npm -f install

COPY . .

RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]
