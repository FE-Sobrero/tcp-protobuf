FROM node
WORKDIR /usr/src
COPY . /usr/src
RUN npm install && npm install -g ts-node
CMD ['ts-node' 'index']