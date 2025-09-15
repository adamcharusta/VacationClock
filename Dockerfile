FROM nginx:1.29-alpine

WORKDIR /usr/share/nginx/html

COPY index.html .
COPY normalize.css .
COPY styles.css .
COPY script.js .
COPY favicon.png .

EXPOSE 80
