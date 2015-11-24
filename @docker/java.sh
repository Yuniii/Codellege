cp /home/*.java /data

if [ -f "/data/$name.java" ]
then
    javac $name.java
else
    echo "檔案寫入失敗！"
fi

if [ -f "/data/$name.class" ]
then
    java $name
else
    echo "編譯失敗"
fi
