# build
FROM httpd:2.4

ARG CONTROLLER_SERVICE=http://lw-controller:8080
ENV CONTROLLER_SERVICE="${CONTROLLER_SERVICE}"
RUN echo "Using ${CONTROLLER_SERVICE}"

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
  && apt-get remove -y python build-essential nodejs curl

RUN mv /app/dist/ /usr/local/apache2/htdocs/
