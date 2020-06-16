FROM node:12.10.0-alpine as buildStage

COPY . /

# install dependencies
RUN apk update && apk add python make g++

RUN npm install -g yarn

# Install dev dependencies to compile typescript
RUN yarn install
RUN yarn build

# After typescript has been compiled install production dependencies
RUN yarn install --prod

FROM nginx:stable-alpine

WORKDIR /daNoize

COPY --from=buildStage /build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
