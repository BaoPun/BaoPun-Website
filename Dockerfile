# Build stage
  FROM node:latest AS builder
  WORKDIR /app
  COPY package*.json .
  RUN npm install
  COPY . .
  RUN npm run build

  EXPOSE 80 443

  CMD ["npm", "start"]

# Production stage with Nginx
  #FROM nginx:alpine
  #COPY --from=builder /app/build /usr/share/nginx/html/
  #COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
  #COPY nginx/nginx.conf /etc/nginx/nginx.conf
  #COPY ansible/templates/nginx.conf.j2 /etc/nginx/conf.d/default.conf
  #EXPOSE 80 443
  #CMD ["nginx", "-g", "daemon off;"]  