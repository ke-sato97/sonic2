FROM node:20-alpine

WORKDIR /app

# 必要なツールをインストール
RUN apk add --no-cache bash

# シェルをbashに設定
SHELL ["/bin/bash", "-c"]

EXPOSE 3000

# コンテナ起動時にTailwindCSSを監視しながらNext.jsを開発モードで実行
CMD ["sh", "-c", "tail -f /dev/null"]
