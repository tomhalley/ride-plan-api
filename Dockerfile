FROM centos:7

COPY .vagrant/confs/mongod.conf /etc/mongod.conf

RUN yum install wget -y

RUN wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.4.tgz
RUN tar -zxvf mongodb-linux-x86_64-3.0.4.tgz
RUN mkdir -p /var/lib/mongodb
RUN cp -R -n mongodb-linux-x86_64-3.0.4/. /var/lib/mongodb
RUN echo "mongod /var/lib/mongod/bin" > /etc/profile.d/mongod.sh
RUN mkdir -p /data/db

EXPOSE 27017

#RUN wget https://nodejs.org/dist/v0.12.5/node-v0.12.5-linux-x64.tar.gz
#RUN tar --strip-components 1 -xzvf node-v* -C /usr/local

#COPY . /src

#WORKDIR /src
#RUN npm install
#ENV NODE_PATH = /src
#ENV NODE_ENV = dev

#EXPOSE 3000