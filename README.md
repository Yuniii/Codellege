# Codellege
@docker 
裡面放的是建立 docker image 的檔案

- 已將建立 docekr image 的建立流程寫在 Dockerfile 中，目前所使用的 image 為 derrickh/codellege:mount3
- docker hub 網址：https://hub.docker.com/r/derrickh/codellege/
- 進入 docker 後會自動執行 java.sh
- java.sh 會呼叫 docker 當中的 GetName 程式來找出使用者程式碼的 class name 並進行編譯回傳執行結果


Codellege.js 
伺服器端的檔案

- 透過 mount 的方式將程式碼傳到 docker 中編譯（將伺服器的 /home 掛載到 docker 的 /data）
- 目前清除 container 的方式是執行後 10 秒強制移除
