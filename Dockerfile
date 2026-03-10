FROM node:25-alpine
WORKDIR /home/app
ADD package*.json ./
RUN npm install
ADD . .
CMD [ "node", "index.js" ]