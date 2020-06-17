FROM ubuntu:14.04

RUN apt-get update
RUN apt-get -y -q install nginx

RUN mkdir -p /var/www/html/website
COPY SourceCode/src/build /var/www/html/website
ADD nginx/global.conf /etc/nginx/conf.d/
ADD nginx/nginx.conf /etc/nginx/
#ADD nginx/htpasswd /etc/nginx/htpasswd

EXPOSE 80

CMD nginx 
