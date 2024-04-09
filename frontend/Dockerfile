FROM node:20-alpine as buildReact

WORKDIR /app
COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

#-------------------------------------

FROM nginx:1.25.4

COPY --from=buildReact /app/build/ /usr/share/nginx/html