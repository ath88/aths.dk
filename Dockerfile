FROM kyma/docker-nginx

RUN mkdir /var/www
COPY index.html /var/www
COPY css /var/www/css
COPY vendor /var/www/vendor

RUN ls -laR /var/www

CMD ["nginx"]
