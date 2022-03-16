import net from "net";
import fs from 'fs';
import {API, FileType, Request, Response,
	ChunkRequest, HashRequest,SizeRequest, VersionRequest, MessageType, ChunkResponse, SizeResponse, CRC32Response
} from './protocol_buffers/api';
import { Message, Reader } from "protobufjs";

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
						type: MessageType.chunk,
						chunk:{
							start: message.request.chunk.start,
							length: 4,
							fileType: message.request.chunk.fileType,
							data:Buffer.from('test')
						} as ChunkResponse
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

const apiCall = {} as API;
const apiResponse = {} as API;

//Request for Version
 apiCall.request = {
		type:MessageType.version,
		version:{
			model:"blg840f",
			hardware: "V9"
		} as VersionRequest
	} as Request

//Response from version request
apiResponse.response={
		type:MessageType.version,
		version: "0.1.10" //Version response is now a string
	} as Response

//Request for hash of version
apiCall.request = {
		type:MessageType.hash,
		hash:{
			model:"blg840f",
			hardware: "V9",
			version: "0.1.10"
		} as HashRequest
	} as Request

//Response from hash of version
apiResponse.response = {
	type:MessageType.hash,
	hash:"4ssW3qP9h6WpE7y/J9qwsw==" //Hash is a string, now
} as Response


//Request a chunk
apiCall.request = {
	type:MessageType.chunk,
	chunk:{
		hash:"4ssW3qP9h6WpE7y/J9qwsw==",
		fileType:FileType.DAT,
		start:0,
		length:1024,
		includeCrc32:true //Note, in proto file, this is "include_crc32". Unsure if C protogen changes the case as well.
	} as ChunkRequest
} as Request


//Chunk response in the event that the .dat was only 4 bytes long, and you requested 1024
apiResponse.response = {
	type:MessageType.chunk,
	chunk:{
		fileType:FileType.DAT,
		start:0,
		length:4,
		data: new Uint8Array([0x01, 0x02, 0x03, 0x04]),
		crc32: 0x28586E6E //note that this is a uint32, now.
	} as ChunkResponse
} as Response


//request size 
apiCall.request = {
	type:MessageType.size,
	size:{
		hash: "4ssW3qP9h6WpE7y/J9qwsw==",
		fileType: FileType.DAT
	} as SizeRequest
} as Request


//response for size
apiResponse.response = {
	type:MessageType.size,
	size:{
		fileType:FileType.DAT,
		value:4
	} as SizeResponse
} as Response

//size matches the received data length, and previous data checksum matches.

//from here, we could make a checksum request, and compare to the overall file if we want.
//Request a chunk
apiCall.request = {
	type:MessageType.crc32,
	chunk:{
		hash:"4ssW3qP9h6WpE7y/J9qwsw==",
		fileType:FileType.DAT,
		start:0,
		length:1024,
		// includeCrc32:true  -- No need to include this field, given when requesting a checksum. (optional in pb)
	} as ChunkRequest
} as Request


//Chunk response in the event that the .dat was only 4 bytes long, and you requested 1024
apiResponse.response = {
	type:MessageType.crc32,
	crc32:{
		fileType:FileType.DAT,
		start:0,
		length:4,
		value: 0x28586E6E //note that this is a uint32, now.
	} as CRC32Response
} as Response

//Gracefully shutdown so that we don't clog up the machine's ports
// const shutdown = () => {
// 	server.removeAllListeners();
// 	server.close(() => {
// 		console.log("\nServer Closed.");
// 	});
// };
// process.on("SIGTERM", shutdown);
// process.on("SIGINT", shutdown);
