# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy the static content (html, css, js, images) to the Nginx web root directory
COPY . /usr/share/nginx/html

# Expose port 80 to allow traffic to the Nginx server
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
