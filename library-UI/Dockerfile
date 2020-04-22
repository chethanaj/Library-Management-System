FROM node:8.11.2-alpine as node
RUN npm install http-server -g
COPY dist/library-UI /app
RUN ls app
ENTRYPOINT ["http-server","app","-p","4200"]
