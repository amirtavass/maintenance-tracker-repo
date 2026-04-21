# 1. Start with Node.js
FROM node:20-alpine

# 2. Set the working directory
WORKDIR /usr/src/app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the Next.js code
COPY . .

# 5. Build the optimized production version of Next.js
RUN npm run build

# 6. Expose the port Next.js uses
EXPOSE 3000

# 7. Start the Next.js production server
CMD ["npm", "start"]