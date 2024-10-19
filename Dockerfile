FROM node:20 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"] # Or "node", "server.js" 
EXPOSE 8080 
