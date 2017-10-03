#!/bin/bash

# propagate the url to the shell
export CONTROLLER_SERVICE=http://$(bx cs workers $PIPELINE_KUBERNETES_CLUSTER_NAME | grep $(kubectl get po -l istio=ingress -n istio-system -o 'jsonpath={.items[0].status.hostIP}') | awk '{print $2}'):$(kubectl get svc istio-ingress -n istio-system -o 'jsonpath={.spec.ports[0].nodePort}')/lw/controller
echo "CONTROLLER_SERVICE=${CONTROLLER_SERVICE}"

# propagate the CF_APP_NAME. we can't see CF_APP from the environment variable
# as it seems the Kubernetes job is setting it to empty
export CF_APP=$CF_APP_NAME
