// Täällä alustetaan palvelin
// const database = require('database');
// const api = require('API');
const http = require('http');
const PORT = 3000;


const server = http.createServer((req, res) => {
res.writeHead(200, { 'content-type': 'text/plain' });
res.end("Hello world!");
});
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});