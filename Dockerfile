FROM node:12.10.0-alpine as buildStage

COPY . /

# install dependencies
RUN apk update && apk add python make g++

RUN npm install -g yarn

# Install dev dependencies to compile typescript
RUN yarn install
RUN yarn build

FROM node:12.10.0-alpine

WORKDIR /daNoize
COPY server /daNoize/app
RUN cd /daNoize/app && yarn install --prod
COPY --from=buildStage build /daNoize/app/build

RUN npm install -g pm2

EXPOSE 3000

CMD [ "pm2", "start", "app/server.js", "--no-daemon", "-f", "-i", "2", "--max-memory-restart", "175M" ]
