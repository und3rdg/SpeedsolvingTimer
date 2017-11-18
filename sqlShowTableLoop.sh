!/bin/env sh

while :
    do
        mysql -e "USE test; SELECT * FROM score;"
        sleep 0.5
    done

