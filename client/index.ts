import net from 'net';
import fs from 'fs'
import {API, FileType, Request, ChunkRequest, 
	HashRequest,SizeRequest, VersionRequest, MessageType, Response } from './protocol_buffers/api';
import {Reader} from 'protobufjs';
import { Hash } from 'crypto';

// const serverConfig = JSON.parse(fs.readFileSync('../shared/server.json','utf8'));
// const host = fs.readFileSync('./serverHost', 'utf8');

// console.log(JSON.stringify(serverConfig,null,2));
const client = net.connect({
	// host:host ?? 'localhost',
	host:'192.168.1.233',
	// host:'localhost',
	// port:serverConfig.port,
	port:8383
});

client.on('data', (data)=>{
	console.log("Received Data from Server");
	const message = API.decode(Reader.create(data));
	console.log(`Message from Socket Connection: ${message.response}`)
	console.log(JSON.stringify(message.response,null,2));
	if(message.response){
		const type = message.response.type;
		if(type === MessageType.size){
			const size = message.response.size;
			console.log(`SizeOf: ${size}`);
		}
		if(type === MessageType.chunk){
			console.log(message.response.chunk);
			let buff = message.response.chunk?.data;
			let buffer = buff?.buffer ?? new ArrayBuffer(1);
			const val = Buffer.from(buffer).toString('hex');
			console.log(val);
			let crc = message.response.chunk?.crc32 ?? 0;
			console.log(`crc32: 0x${crc.toString(16)}`)
		}
		if(type === MessageType.crc32){
			console.log(message)
		}
	}
});

// 4ssW3qP9h6WpE7y/J9qwsw== is the current firmware hash at the time of writing
client.on('connect',() => {
	const apiCall = {
		request:{
			type:MessageType.crc32,
			// size:{
			// 	fileType: FileType.BIN,
			// 	hash: '4ssW3qP9h6WpE7y/J9qwsw==',
			// } as SizeRequest
			crc32:{
				hash:'4ssW3qP9h6WpE7y/J9qwsw==',
				start:0,
				length: 121324,
				fileType: FileType.BIN
			} as ChunkRequest
	} as Request
};
	const apiPacket = API.fromJSON(apiCall);
	const apiProtoBuf = API.encode(apiPacket).finish();

	console.log(`Writing Data to Server: ${JSON.stringify(apiPacket,null,2)} | Size: ${apiProtoBuf.byteLength}`);
	client.write(apiProtoBuf, (err)=>{
		if(err)throw err;
	});
	
});

client.on("close", (err)=>{
	console.log("Closing Connection with Server.");
	if(err)throw err;
});