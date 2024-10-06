# Step 1: Use an official Node image as the base image
FROM node:18-alpine as build

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use a lightweight web server (nginx) to serve the built files
FROM nginx:alpine

# Step 8: Copy the build output to the nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the default port for nginx
EXPOSE 80

# Step 10: Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
