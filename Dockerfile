# Build stage
  FROM node:latest AS builder
  WORKDIR /opt/baopun-website/frontend
  COPY package*.json .
  RUN npm install
  COPY . .
  RUN npm run build

# Production stage with Nginx
  FROM nginx:alpine
  RUN rm -rf /etc/nginx/nginx.conf*
  COPY --from=builder /opt/baopun-website/frontend/build /usr/share/nginx/html/
  #COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
  COPY nginx/nginx.conf /etc/nginx/nginx.conf
  COPY ansible/templates/nginx.conf.j2 /etc/nginx/conf.d/default.conf
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]  