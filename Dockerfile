# This dockerfile uses the ubuntu image
# v0.1
# Author: Alex Qin

# Pull base image.
FROM ubuntu
# Maintainer: qianjin.qin@qq.com
MAINTAINER qianjin.qin@qq.com
# Install nodejs.
RUN \
#  echo "nameserver 8.8.8.8" >> /etc/resolv.conf && \
  apt-get update && \
  apt-get install -y gnupg && \
  apt-get install -y curl && \
  apt-get install -y apt-utils && \
  curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
  apt-get install -y nodejs 
COPY . /home/weapon
WORKDIR /home/weapon
RUN \
  cd server && \
  npm install
# Define default command.
# CMD ["npm install && npm start"]
CMD ["node", "server/index.js"]

# Expose ports.
EXPOSE 3000