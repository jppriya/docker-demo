FROM nginx

RUN ls -al

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY /dist/product-ui/ /usr/share/nginx/html

RUN ls -alR /usr/share/nginx/html

EXPOSE 80