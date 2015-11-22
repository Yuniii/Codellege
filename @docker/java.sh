echo $code > Main.java

if [ -f "Main.java" ]
then
    javac Main.java
else
    echo "檔案寫入失敗！"
fi

if [ -f "Main.class" ]
then
    java Main
else
    echo "編譯失敗"
fi
