#
# Dockerfile for GitHub proxy server
#
FROM nginx:1.13.12
LABEL author="Patrick Kohler"

ARG AUTH

RUN mkdir -p /data/nginx/cache

COPY nginx.conf /etc/nginx
RUN sed -i "s/!AUTH/'${AUTH}'/g" /etc/nginx/nginx.conf

EXPOSE 80