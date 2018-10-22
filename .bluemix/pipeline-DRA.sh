# devops insights service

# install devops CLI (requires node)
npm install -g grunt-idra3

# set env vars
export DEPLOYABLE_ID=$(bx app env $CF_APP | grep application_id | awk '{ print $2 }' | cut -c 2-37)
export STATUS=$(bx app show $CF_APP | tail -1 | awk '{ print $2 }')
if [ "$STATUS" = "running" ] || [ "$STATUS" = "started" ] ; then
  export STATUS=pass
else
  export STATUS=fail
fi

# upload deployment record
idra --publishdeployrecord  --env=$LOGICAL_ENV_NAME --status=$STATUS --deployableid=$DEPLOYABLE_ID