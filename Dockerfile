FROM node

RUN apt-get update && apt-get install -y \
    default-jre \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "root:Docker!" | chpasswd \
    && rm -rf /var/lib/apt/lists/*
COPY sshd_config /etc/ssh/

WORKDIR /usr/local
COPY package.json .
COPY package-lock.json* .

RUN npm install && npm cache clean --force
ENV PATH=/usr/local/node_modules/.bin:$PATH

WORKDIR /usr/local/app
COPY . .
RUN chmod u+x ./entrypoint.sh

EXPOSE 8000 2222

RUN npx prisma generate

CMD ["./entrypoint.sh"]
# CMD ["npm", "run", "dev"]