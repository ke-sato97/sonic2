FROM node:20-alpine

ENV DEBIAN_FRONTEND=noninteractive

# 必要なツールをインストール（vim など便利系も追加）
RUN apk add --no-cache \
    bash \
    vim \
    git \
    curl \
    wget \
    tzdata \
    net-tools \
    iputils

EXPOSE 3000
