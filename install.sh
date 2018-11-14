#!/bin/bash  
# echo "This is a shell script"  
# ls -lah  
# echo "I am done running ls"  
# SOMEVAR='text stuff'  
# echo "$SOMEVAR"

###########################
#
#Install Docker CE
#
###########################
# sudo apt-get update
# sudo apt install apt-transport-https ca-certificates curl software-properties-common
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
# sudo apt-get update
# apt-cache policy docker-ce
# sudo apt-get install -y docker-ce

###########################
#
#Install Nodejs
#
###########################
# echo "Install Nodejs"
# curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
# sudo apt-get install -y nodejs

###########################
#
#Install MongoDB
#
###########################
# echo "Install MongoDB"
# echo "add keyserver"
# sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
# echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
# echo "update"
# sudo apt-get update
# echo "install mongodb-org"
# sudo apt-get install -y mongodb-org

###########################
#
#Install ss
#
###########################
echo "Install ss"
sudo apt update
# sudo apt install shadowsocks-libev # Ubuntu 16.10 or higher
sudo apt-get install software-properties-common -y
sudo add-apt-repository ppa:max-c-lv/shadowsocks-libev -y
sudo apt-get update
sudo apt install shadowsocks-libev -y
# sudo vi /etc/shadowsocks-libev/config.json
# sudo /etc/init.d/shadowsocks-libev start # for sysvinit
# sudo systemctl start shadowsocks-libev # for systemd

###########################
#
#Install IPSec PSK
#
###########################
# wget https://git.io/vpnsetup -O vpnsetup.sh
# nano -w vpnsetup.sh
# [Replace with your own values: YOUR_IPSEC_PSK, YOUR_USERNAME and YOUR_PASSWORD]
# sudo sh vpnsetup.sh