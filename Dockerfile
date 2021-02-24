FROM node:8.10-alpine

WORKDIR /public

COPY . /public

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "prod" ]