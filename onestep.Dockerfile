# similar to Dockerfile, but uses Apache HTTPd and does not use multi-stage build
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
  && mv -f /app/dist/* /usr/local/apache2/htdocs/ \
  && apt-get remove -y python build-essential nodejs curl

# Listen on 8080
RUN sed -i "s/Listen 80/Listen 8080/g" /usr/local/apache2/conf/httpd.conf
EXPOSE 8080
