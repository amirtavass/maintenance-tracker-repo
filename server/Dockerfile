# 1. Start with a lightweight version of Node.js
FROM node:20-alpine

# 2. Create a folder inside the container to hold your code
WORKDIR /usr/src/app

# 3. Copy ONLY the package files first (this makes future builds much faster)
COPY package*.json ./

# 4. Install the backend dependencies
RUN npm install

# 5. Copy the rest of your server code into the container
COPY . .

# 6. Expose the port your Express server uses
EXPOSE 5000

# 7. The command to run when the container starts
CMD ["npm", "start"]