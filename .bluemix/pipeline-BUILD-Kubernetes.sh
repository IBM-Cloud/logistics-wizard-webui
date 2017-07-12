#!/bin/bash

# propagate the url to the shell
export CONTROLLER_SERVICE=http://$(kubectl get po -l istio=ingress -o 'jsonpath={.items[0].status.hostIP}'):$(kubectl get svc istio-ingress -o 'jsonpath={.spec.ports[0].nodePort}')/lw/controller
echo "CONTROLLER_SERVICE=${CONTROLLER_SERVICE}"

# propagate the CF_APP_NAME. we can't see CF_APP from the environment variable
# as it seems the Kubernetes job is setting it to empty
export CF_APP=$CF_APP_NAME
