FROM node18-alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 3000
CMD [ "node", "src/index" ]

#Build the Docker image
## docker build -t your-image-name .


#Run the Docker container
## docker run --name your-container-name -p 3000:3000 your-image-name.
