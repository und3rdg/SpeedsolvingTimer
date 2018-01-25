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

echo '>>>>>>> CONNECTING'
ssh $serverHost "cd $publishPath;\
    git checkout -- .;\

    echo '>>>> GIT STATUS';\
    git status -s;\

    echo '>>>> GIT LOG';\
    git log --oneline -1"

echo '>>>>>>> END CONNECTION'

echo '>>>> LOCAL GIT LOG'
git log --oneline -1

cd -
echo '>>>> HAPPY 2 U'
