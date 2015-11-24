cp /home/*.java /data
mv /app/GetName.class /data
java GetName *.java

if [ -f "/data/$(cat name).java" ]
then
    javac $(cat name).java
else
    echo "檔案寫入失敗！"
fi

if [ -f "/data/$(cat name).class" ]
then
    java $(cat name)
else
    echo "編譯失敗"
fi
