FROM python:3.6

RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt

RUN apt-get update
RUN apt-get install postgresql-client -y
#RUN ["apt-get", "update"]
#RUN ["apt-get", "install", "vim"]
ADD . /code/


