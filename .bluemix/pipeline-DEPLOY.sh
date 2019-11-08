#!/bin/bash
echo Login IBM Cloud api=$CF_TARGET_URL org=$CF_ORG space=$CF_SPACE
ibmcloud login -a "$CF_TARGET_URL" --apikey "$IAM_API_KEY" -o "$CF_ORG" -s "$CF_SPACE"

# Push the app
if ! ibmcloud cf app $CF_APP; then
  ibmcloud cf push $CF_APP -n $CF_APP
else
  OLD_CF_APP=${CF_APP}-OLD-$(date +"%s")
  rollback() {
    set +e
    if ibmcloud cf app $OLD_CF_APP; then
      ibmcloud cf logs $CF_APP --recent
      ibmcloud cf delete $CF_APP -f
      ibmcloud cf rename $OLD_CF_APP $CF_APP
    fi
    exit 1
  }
  set -e
  trap rollback ERR
  ibmcloud cf rename $CF_APP $OLD_CF_APP
  ibmcloud cf push $CF_APP -n $CF_APP
  ibmcloud cf delete $OLD_CF_APP -f
fi
