FROM node:alpine3.18 as build

# Build App
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

#Serve with nginx
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=dist /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off:" ]