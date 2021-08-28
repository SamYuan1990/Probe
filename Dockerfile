FROM alpine:latest

LABEL maintainer="yy19902439@126.com"

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk add --no-cache bash docker-cli nodejs npm
#RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
#RUN bash n lts
#RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN mkdir -p /home/probe
COPY . /home/probe

WORKDIR /home/probe
RUN npm install

EXPOSE 3000

CMD npm start