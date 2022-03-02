FROM node
WORKDIR /usr/src/
COPY . /usr/src
RUN touch /usr/src/serverHost && echo -n "host.docker.internal" >> /usr/src/serverHost
RUN npm install && npm install -g ts-node
CMD ['ts-node' 'index']