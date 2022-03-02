import net from 'net';
import fs from 'fs'
import {API, FileType, Request, ChunkRequest, 
	HashRequest,SizeRequest, VersionRequest, ResponseType, Response} from './protocol_buffers/api';
import {Reader} from 'protobufjs';

const serverConfig = JSON.parse(fs.readFileSync('../shared/server.json','utf8'));
const host = fs.readFileSync('./serverHost', 'utf8');
console.log(JSON.stringify(serverConfig,null,2));
const client = net.connect({
	host:host ?? 'localhost',
	port:serverConfig.port,
});

client.on('data', (data)=>{
	console.log("Received Data from Server");
	const message = API.decode(Reader.create(data));
	console.log(`Message from Socket Connection: ${message.response}`)
	console.log(JSON.stringify(message.response,null,2));
});

client.on('connect',() => {
	const apiCall = {
		request:{
			chunk:{
				hash:'1234',
				fileType:FileType.BIN,
				start: 1234,
				length:1024
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