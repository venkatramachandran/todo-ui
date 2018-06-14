FROM nginx:1.15.0

WORKDIR /data/www
COPY . /data/www

COPY ./nginx.conf /etc/nginx
