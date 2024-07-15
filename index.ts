const hostname = Bun.argv[2];
const port = Bun.argv[3];

if (Bun.argv.length < 4) {
    console.log("Usage: bun run index.ts <hostname> <port>");
    process.exit(1);
}else if(port.length > 5){
    console.log("Wrong Arguments")
    console.log("Usage: bun run index.ts <hostname> <port>")
    process.exit(1);
}

const net = require('net');

const client = new net.Socket();
let recvmsg = "";
client.connect(port, hostname, () => {
    console.log(`Connected to ${hostname}:${port}`);
    client.write("GET / HTTP/1.0\r\n\r\n");
});

client.on('data', (data: string) => {
    recvmsg = data.toString();
    console.log(recvmsg);
    client.end();
});


client.on('end', () => {
    console.log('Disconnected');
});