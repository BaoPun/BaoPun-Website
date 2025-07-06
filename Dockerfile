# Build stage
  FROM node:18-alpine AS builder
  COPY package*.json ./
  RUN npm install
  WORKDIR /app
  COPY . .
  RUN npm run build
  
  # Production stage with Nginx
  FROM nginx:alpine
  COPY --from=builder /app/build /usr/share/nginx/html
  COPY nginx/nginx.conf /etc/nginx/nginx.conf
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]  