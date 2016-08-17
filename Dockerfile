FROM nginx:alpine
MAINTAINER Geoff Perks - geoff.perks@me.com
COPY docker/emilena.conf /etc/nginx/nginx.conf
COPY dist /srv/www