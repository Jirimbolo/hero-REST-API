// Täällä alustetaan palvelin

const http = require('http');
const url = require("url");
const database = require('database');
const api = require('API');
const PORT = 3000;


const server = http.createServer((req, res) => {

    const reqURL = url.parse(req.url).pathname;


    //  res.writeHead(200, { 'content-type': 'text/plain' });
    //  res.end("Hello world!");
});
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});