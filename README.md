# tcp-protobuf
TCP Client and Server w/ Protocol Buffers, written in TypeScript

# Getting Started
There are two options for running the project.</br>
The easiest method is by running as docker containers.</br>
Unless you intend to modify the project, do the docker start.

## Start with Docker
1. Install [Docker](https://docs.docker.com/get-docker/)
	- Make sure that [Docker Compose](https://docs.docker.com/compose/) is installed (should be with docker desktop)
2. Start the Containers
	- Run `$ docker compose up`

Commands: 
- Build:  `$ docker compose build`
- Run: 	`$ docker compose up`
- Stop: `$ docker compose down`

Each command can also be run for an individual container ex:

```bash
docker compose build server
docker compose up server
```

```bash
docker compose build client
docker compose up client
docker compose down client
docker compose up client
```
___
## Run as Dev
1. Install [ProtoC](https://grpc.io/docs/protoc-installation/)
2. Install [NodeJS](https://nodejs.org/en/)
3. Install ts-node & typescript by running `npm install -g ts-node typescript`

### Server
Installing Deps & Running Server
```bash 
cd <PATH_TO_PROJECT>/server
# Install Server dependencies
npm install
# Generate Protocol Buffers
npm run proto
# Start the server
ts-node index
```

### Client
Installing Deps & Running Client
```bash 
cd <PATH_TO_PROJECT>/client
# Install Client dependencies
npm install
# Generate Protocol Buffers
npm run proto
# Start the client
ts-node index
```
___