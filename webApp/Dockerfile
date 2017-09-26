FROM node:6

RUN mkdir /code
WORKDIR /code

ADD . /code/

RUN apt-get update
RUN apt-get install vim -y

# Install dependecies
RUN npm cache clear
RUN npm install

EXPOSE 4200




