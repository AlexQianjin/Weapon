# This dockerfile uses the ubuntu image
# v0.1
# Author: Alex Qin

# Pull base image.
FROM ubuntu
# Maintainer: qianjin.qin@qq.com
MAINTAINER qianjin.qin@qq.com
# Install Nginx.
RUN \
  apt-get update && \
  apt-get install -y gnupg && \
  curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
  apt-get install -y nodejs 
COPY ./ /home/weapon
WORKDIR /home/weapon
# Define default command.
CMD ["npm install && npm start"]

# Expose ports.
EXPOSE 3000