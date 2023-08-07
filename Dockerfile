FROM node:alpine3.18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4200
CMD ["npm", "start"]

