!/bin/env sh

while :
    do
        mysql -e "USE test; SELECT * FROM score;"
        sleep 1
    done

