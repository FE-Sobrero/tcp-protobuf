import net from "net";
import fs from 'fs';
import {API, FileType, Request, Response,
	ChunkRequest, HashRequest,SizeRequest, VersionRequest, ResponseType
} from './protocol_buffers/api';
import { Reader } from "protobufjs";

const handleData = (data:any)=>{
	let response = {};
	try{
		const message = API.decode(Reader.create(data));
		console.log(`Message from Socket Connection: ${message.request}`)
		console.log(JSON.stringify(message.request,null,2));
		if(message.request === undefined)return {error:1}
		if(message.request.chunk){
			return {
					response:{
						type: ResponseType.chunk,
						data: Buffer.from('test')
				} as Response
			} as API
		}
		
	}catch{
		return {error:1}
	}
	return response;
}

const server = net.createServer((socket) => {
	// Write something when connection is ended.
  // socket.end('Data sent immediately before closing socket');

	//Do something when a client connects
	socket.on('connection', (socket)=>{
		//handle connection
	});


	socket.on('data', (data)=>{
		const res = handleData(data);
		socket.write(API.encode(API.fromJSON(res)).finish());
	});

	socket.on('error', (err) => {
		// Handle errors here.
		if(err)throw err;
	});
});

// Grab an arbitrary unused port.
server.listen({port:8389}, () => {
  console.log('opened server on', server.address());
	//Write the server configuration to a json file in the shared volume/folder
	fs.writeFileSync('../shared/server.json', JSON.stringify(server.address()));
});




//Gracefully shutdown so that we don't clog up the machine's ports
// const shutdown = () => {
// 	server.removeAllListeners();
// 	server.close(() => {
// 		console.log("\nServer Closed.");
// 	});
// };
// process.on("SIGTERM", shutdown);
// process.on("SIGINT", shutdown);
