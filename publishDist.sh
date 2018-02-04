#!/bin/env sh

### LOCAL ###
commitMsg=`date`
serverHost="laohost"
distPath=~/Code/sstimer/dist/

### REMOTE ###
publishPath=sstimer.tk

cd $distPath
git add .
git cm -m "$commitMsg"
git push

cd -
echo '* all done'
