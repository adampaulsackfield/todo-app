FROM node:alpine

WORKDIR /src

ENV PATH /node_modules/.bin:$PATH

COPY package.json ./

COPY package-lock.json ./

RUN npm i

COPY . ./

EXPOSE 5001

CMD ["npm", "start"]