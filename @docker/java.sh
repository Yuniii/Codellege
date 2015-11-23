if [ -f "/data/Main.java" ]
then
    javac /data/Main.java
else
    echo "檔案寫入失敗！"
fi

if [ -f "/data/Main.class" ]
then
    java Main
else
    echo "編譯失敗"
fi
