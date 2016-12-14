#!/bin/bash
npm config delete prefix
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 4.4
npm install
npm run test
npm run check-coverage
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
export CONTROLLER_SERVICE=https://$CONTROLLER_SERVICE_APP_NAME$domain
npm run deploy:prod

# copy deploy build script to dist
mkdir dist/.bluemix
cp .bluemix/pipeline-DEPLOY.sh dist/.bluemix
