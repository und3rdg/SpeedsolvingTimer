#!/bin/env sh

### LOCAL ###
commitMsg=`date`
serverHost="laohost"
distPath=~/Code/sstimer/dist/

### REMOTE ###
publishPath=sstimer.tk

echo "     ?> cd $distPath"
cd $distPath

echo "     ?> add."
git add .

echo "     ?> git cm -m "$commitMsg""
git cm -m "$commitMsg"

echo "     ?> git push"
git push

echo "     ?> cd -"
cd -

echo "     ?> * all done"
