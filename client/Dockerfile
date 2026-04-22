# 1. Start with Node.js
FROM node:20-alpine

# 2. Set the working directory
WORKDIR /usr/src/app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the Next.js code
COPY . .

# 5. Catch the variable from docker-compose!
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# 6. Build the optimized production version of Next.js
RUN npm run build

# 7. Expose the port Next.js uses
EXPOSE 3000

# 8. Start the Next.js production server
CMD ["npm", "start"]