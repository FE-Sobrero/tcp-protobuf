FROM node
WORKDIR /usr/src
COPY . /usr/src
RUN npm install && npm install -g ts-node && npm run proto
CMD ['ts-node' 'index']