FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install

# Copy app in
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
