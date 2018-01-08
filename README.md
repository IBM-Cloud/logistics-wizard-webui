# Logistics Wizard Web User Interface

| **master** | [![Build Status](https://travis-ci.org/IBM-Cloud/logistics-wizard-webui.svg?branch=master)](https://travis-ci.org/IBM-Cloud/logistics-wizard-webui) [![Coverage Status](https://coveralls.io/repos/github/IBM-Cloud/logistics-wizard-webui/badge.svg?branch=master)](https://coveralls.io/github/IBM-Cloud/logistics-wizard-webui?branch=master) |
| ----- | ----- |
| **dev** | [![Build Status](https://travis-ci.org/IBM-Cloud/logistics-wizard-webui.svg?branch=dev)](https://travis-ci.org/IBM-Cloud/logistics-wizard-webui) [![Coverage Status](https://coveralls.io/repos/github/IBM-Cloud/logistics-wizard-webui/badge.svg?branch=dev)](https://coveralls.io/github/IBM-Cloud/logistics-wizard-webui?branch=dev)|
<a href="https://www.zenhub.com/"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>

This project is part of the larger [Logistics Wizard](https://github.com/IBM-Cloud/logistics-wizard) project.

## Overview

This project is designed with a bunch of awesome new front-end technologies, all on top of a configurable, feature-rich webpack build system that's already setup to provide hot reloading, CSS modules with Sass support, unit testing, code coverage reports, bundle splitting, and a whole lot more, while providing amazing developer tools such as Redux CLI (a generator), Redux devtools (Chrome extension), and Storybook for visually developing and testing components.

This is meant to be a client-side static file application only. No server is used when application is deployed.


## Running the WEBUI locally

When the application runs locally, it uses a Node.js server to bring you developer tools like hot swap. **When deployed to Cloud, Node.js runtime is NOT used.** We will build static files to the `dist` folder and use nginx to host those static files as a purely client side application. Do not write any server side code in this application.

#### Get the code
```
git clone https://github.com/IBM-Cloud/logistics-wizard-webui
cd logistics-wizard-webui
npm install
```

#### Set up env vars
Create a file called `config/.env` with the following data. See `.env-example`
```javascript
module.exports = {
  controller_service: '<url to your controller api service>',
  google_maps_key: '<your google maps api key here (optional)>',
}
```

## Deploy the WEBUI to IBM Cloud - Cloud Foundry

To use a continous integration pipeline to handle build and deployment, go here: https://github.com/IBM-Cloud/logistics-wizard-toolchain. To manually push to Cloud, continue:

We need to compile/build the application to generate static web files. Then push only those static files to Cloud and use the nginx buildpack to host the files

Verify that your `config/.env` file has the correct controller service URL. This URL will be read and injected to the static files during the build process.
```
npm run clean
npm run deploy:prod
cd dist
```

Test to see if your built application is working OK:

```
 npm install http-server -g
 http-server
```
Application should be available at http://127.0.0.1:8080 . If everything looks OK, push it to IBM Cloud
```
bx cf push <unique-app-name> -b staticfile_buildpack
```
