#!/bin/bash

# get Bluemix CLI
wget --quiet --output-document=/tmp/Bluemix_CLI_amd64.tar.gz  http://public.dhe.ibm.com/cloud/bluemix/cli/bluemix-cli/latest/Bluemix_CLI_amd64.tar.gz
tar -xf /tmp/Bluemix_CLI_amd64.tar.gz --directory=/tmp

echo "#!/bin/sh" >/tmp/Bluemix_CLI/bin/bx
echo "/tmp/Bluemix_CLI/bin/bluemix \"\$@\" " >>/tmp/Bluemix_CLI/bin/bx
chmod +x /tmp/Bluemix_CLI/bin/*

export PATH="/tmp/Bluemix_CLI/bin:$PATH"

# get kubectl
mkdir /tmp/bin
export PATH="/tmp/bin:$PATH"

wget --quiet --output-document=/tmp/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x /tmp/bin/kubectl

# log into Bluemix
bx login -a "$CF_TARGET_URL" --apikey "$BLUEMIX_API_KEY" -o "$CF_ORG" -s "$CF_SPACE"

# log into container service
bx plugin install container-service -r Bluemix
bx cs init

# use the provided cluster
exp=$(bx cs cluster-config $CLUSTER_NAME | grep export)
eval "$exp"

# propagate the url to the shell
export CONTROLLER_SERVICE=http://$(kubectl get po -l istio=ingress -o 'jsonpath={.items[0].status.hostIP}'):$(kubectl get svc istio-ingress -o 'jsonpath={.spec.ports[0].nodePort}')/lw/controller
echo "CONTROLLER_SERVICE=${CONTROLLER_SERVICE}"
