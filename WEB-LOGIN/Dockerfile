 
FROM node:18 AS build
WORKDIR /app
 
COPY package*.json ./

RUN npm install
 
ENV NG_CLI_ANALYTICS=false
ENV NG_BUILD_CACHE=false
 
COPY . .
 
RUN npm run build -- --configuration production --no-cache
 
FROM nginx:alpine
COPY --from=build /app/dist/web-login /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
