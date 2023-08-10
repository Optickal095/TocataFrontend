# Node image
FROM node:18.15.0

# DIR
WORKDIR /app

# Copy dist
COPY dist/ /app/

# PORT 4200
EXPOSE 4200

# Install package.json and http-server
RUN npm install -g http-server

# Start
CMD ["http-server", "-p", "4200"]