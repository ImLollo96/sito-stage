FROM node:16-alpine3.11 as builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /usr/src/app/dist/progetto1/ /usr/share/nginx/html