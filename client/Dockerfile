# Use an official  as a parent image.
FROM node:16.13.0

RUN apt-get update && apt-get install libuv1 nodejs -y

RUN npm install -g --save npm@latest

RUN npm install -g create-react-app

WORKDIR /client

COPY ["./client/package.json", "./client/"]

ARG API_URL
ENV REACT_APP_HOST_IP_ADDRESS $API_URL

# Run npm command
CMD npm i && npm start