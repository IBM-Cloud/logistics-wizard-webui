#!/bin/bash
if [ -z ${COVERALLS_REPO_TOKEN} ]; then
  echo No Coveralls token specified, skipping coveralls.io upload
else
  COVERALLS_REPO_TOKEN=$COVERALLS_REPO_TOKEN npm run coveralls
fi
# inject the location of the controller service
domain=".mybluemix.net"
case "${REGION_ID}" in
  ibm:yp:eu-gb)
    domain=".eu-gb.mybluemix.net"
  ;;
  ibm:yp:au-syd)
  domain=".au-syd.mybluemix.net"
  ;;
esac
if [ ! -z "$CONTROLLER_SERVICE_APP_NAME" ]; then
  export CONTROLLER_SERVICE=https://$CONTROLLER_SERVICE_APP_NAME$domain
fi
if [ -z "$CONTROLLER_SERVICE" ]; then
  echo "CONTROLLER_SERVICE url not defined."
  exit 1;
fi

npm config delete prefix
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 5.12
npm install
npm run test
npm run check-coverage
npm run deploy:prod

# copy deploy build script to dist
mkdir dist/.bluemix
cp .bluemix/pipeline-DEPLOY.sh dist/.bluemix
