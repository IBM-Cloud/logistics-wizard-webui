# build
FROM nginx:stable

ARG CONTROLLER_SERVICE=http://lw-controller:8080
ENV CONTROLLER_SERVICE="${CONTROLLER_SERVICE}"

WORKDIR /app
COPY . .

RUN apt-get update \
  && apt-get install -y curl gnupg \
  && (curl -sL https://deb.nodesource.com/setup_8.x | bash -) \
  && apt-get update \
  && apt-get install -y python build-essential nodejs \
  && npm install \
  && npm run deploy:prod \
  && rm -rf node_modules \
  && apt-get remove -y python build-essential nodejs curl gnupg

# RUN apk add --no-cache --virtual .build-deps nodejs alpine-sdk python \
#   && npm install \
#   && npm run deploy:prod \
#   && apk del .build-deps

RUN cp /app/dist/docker-nginx.conf /etc/nginx/conf.d/default.conf
RUN mv /app/dist/ /var/www/

CMD ["nginx", "-g", "daemon off;"]
