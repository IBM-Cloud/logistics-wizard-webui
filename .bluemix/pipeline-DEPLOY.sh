#!/bin/bash
echo Login IBM Cloud api=$CF_TARGET_URL org=$CF_ORG space=$CF_SPACE
bx login -a "$CF_TARGET_URL" --apikey "$IAM_API_KEY" -o "$CF_ORG" -s "$CF_SPACE"

# Push the app
if ! bx app show $CF_APP; then
  bx app push $CF_APP -n $CF_APP
else
  OLD_CF_APP=${CF_APP}-OLD-$(date +"%s")
  rollback() {
    set +e
    if bx app show $OLD_CF_APP; then
      bx app logs $CF_APP --recent
      bx app delete $CF_APP -f
      bx app rename $OLD_CF_APP $CF_APP
    fi
    exit 1
  }
  set -e
  trap rollback ERR
  bx app rename $CF_APP $OLD_CF_APP
  bx app push $CF_APP -n $CF_APP
  bx app delete $OLD_CF_APP -f
fi
