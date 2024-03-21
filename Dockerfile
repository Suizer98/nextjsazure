FROM node

RUN apt-get update && apt-get install -y \
    default-jre \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/local

COPY package.json package-lock.json* .npmrc* .

RUN npm install && npm cache clean --force
ENV PATH=/usr/local/node_modules/.bin:$PATH

WORKDIR /usr/local/app