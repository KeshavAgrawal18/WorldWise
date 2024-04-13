FROM node:alpine3.18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]

#Server configuration
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=dist /app/dist .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off:" ]