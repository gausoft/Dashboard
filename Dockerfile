
# base image
FROM node:14

# set working directory
WORKDIR /backend

# add `/app/node_modules/.bin` to $PATH
ENV PATH sources/backend/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json sources/backend/package.json
RUN npm install

# start app
CMD ["npm", "start"]