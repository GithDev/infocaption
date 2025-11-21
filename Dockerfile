FROM node:22.12.0-alpine3.19 AS build
WORKDIR /app


COPY package.json package-lock.json* ./
RUN npm ci

COPY .env .env

COPY . .
RUN npm run build

FROM nginx:1.29-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]