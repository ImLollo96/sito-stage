FROM node:16-alpine3.11 as builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
# default env variables
ENV BACKEND_ADDR backend
ENV BACKEND_PORT 3000

COPY --from=builder /usr/src/app/dist/progetto1/ /usr/share/nginx/html
COPY ./nginx.conf.template ./
CMD ["/bin/sh" , "-c" , "envsubst '$BACKEND_ADDR $BACKEND_PORT' < ./nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
