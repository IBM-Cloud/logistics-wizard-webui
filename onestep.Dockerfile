# build
FROM nginx:stable-alpine

ARG CONTROLLER_SERVICE=http://lw-controller:8080
ENV CONTROLLER_SERVICE="${CONTROLLER_SERVICE}"

WORKDIR /app
COPY . .

RUN apk add --no-cache --virtual .build-deps nodejs alpine-sdk python \
  && npm install \
  && npm run deploy:prod \
  && apk del .build-deps

RUN cp /app/dist/docker-nginx.conf /etc/nginx/conf.d/default.conf
RUN mv /app/dist/ /var/www/

CMD ["nginx", "-g", "daemon off;"]
