FROM node:20-alpine as buildReact

WORKDIR /app
COPY package*.json ./
RUN npm i
ARG BACKEND
ENV REACT_APP_BACKEND=$BACKEND

COPY . .
RUN npm run build

#-------------------------------------

FROM nginx:1.25.4

COPY --from=buildReact /app/build/ /usr/share/nginx/html