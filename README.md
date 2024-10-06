# Mosaic Project

This project is a web application built using React and served with NGINX. It is containerized using Docker for ease of deployment and portability.

## Prerequisites

Before you begin, make sure you have the following installed on your local machine:

- [Docker](https://www.docker.com/get-started)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Mosaic
```

### 2. Build the Docker Image

To build the Docker image, run the following command in the project root (where the `Dockerfile` is located):

```bash
docker build -t mosaic .
```

This will create a Docker image tagged as `mosaic`.

### 3. Run the Docker Container

After successfully building the image, run the container with the following command:

```bash
docker run -p 3000:80 mosaic
```

This command will start the container and map port `3000` on your machine to port `80` in the container, which is the port NGINX is serving on. You can then access the application by visiting:

```
http://localhost:3000
```

### 4. Stop the Container

To stop the running container, use the following command:

```bash
docker ps
```

This will list the running containers and their IDs. Find the container ID for `mosaic`, then run:

```bash
docker stop <container_id>
```

### 5. Remove the Container

To remove a stopped container, run:

```bash
docker rm <container_id>
```

### 6. View Docker Images

To view the Docker images available on your system, run:

```bash
docker images
```

### Troubleshooting

If you encounter any issues, check the following:

- Ensure Docker is running.
- Verify that the image is successfully built by running `docker images`.
- Check the logs of the running container for any errors:

```bash
docker logs <container_id>
```

## Development

To develop the project locally without Docker, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

The app should be available at `http://localhost:3000` by default.
