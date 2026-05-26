# Stage 1: Build the React application
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# We accept the VITE_API_URL as a build arg so it gets baked into the frontend
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the built app to nginx's serve directory
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx configuration for client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
