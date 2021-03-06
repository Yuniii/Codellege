cp /home/*.java /data
cp /home/input /data
mv /app/GetName.class /data
java GetName *.java

if [ -f "/data/$(cat name).java" ]
then
    javac $(cat name).java 2> log
else
    echo "檔案寫入失敗"
fi

if [ -f "/data/$(cat name).class" ]
then
    java $(cat name) < input
else
    echo "編譯失敗"
    if [ -f "/data/log" ]
    then
	echo $(cat log)
    else
	echo "程式中請包含一個 public class"
    fi
fi
