#!/bin/bash

script=$(readlink -f $0)
dir=`dirname $script`

node $dir/../tmp/test.js > $dir/../tmp/listIdList
node $dir/../tmp/test2.js > $dir/../tmp/listIdCard.json
cat $dir/../tmp/listIdCard.json > $dir/../tmp/tmp.json
echo [ > $dir/../tmp/listIdCard.json
wc=$(wc -l $dir/../tmp/tmp.json | cut -d' ' -f1)
i=1
cat $dir/../tmp/tmp.json | while read line
do
    if [ $i -eq $wc ]
    then
        echo $line >> $dir/../tmp/listIdCard.json
    else
        echo $line, >> $dir/../tmp/listIdCard.json
    fi
    i=$(($i + 1))
done

echo ] >> $dir/../tmp/listIdCard.json