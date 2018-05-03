#!/bin/bash  
# echo "This is a shell script"  
# ls -lah  
# echo "I am done running ls"  
# SOMEVAR='text stuff'  
# echo "$SOMEVAR"


###########################
#
#Install Nodejs
#
###########################

echo "Install Nodejs"

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

sudo apt-get install -y nodejs

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