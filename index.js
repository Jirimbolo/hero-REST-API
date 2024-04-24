// Täällä alustetaan palvelin 
// lataamalla moduuleja ja asettamalla polkuja

const express = require('express');
const app = express();
// const database = require('database');
// const routes = require('./api');

// luodaan dotenv kansio ja palvelinportti
const dotenv = require ('dotenv').config();
const port = dotenv.parsed.PORT00 || 3000;

// otetaan reitit käyttöön
// app.use('./api', routes);
// CRUD Reittejä GETall, GETid, POST, PUT, DELETE

app.get('/', (req, res) => {
res.send('Hello world');
console.log("Hello world");
});

app.get('/api/all', (req, res) => {
  res.send([1, 2, 3, 4]);
  console.log("getAll");
    });

app.get('/api/:1', (req, res) => {
 res.send(req.params.id);
 console.log("getID")
   });

app.post('/api/post', (req, res) => {
         res.send("POST");
         console.log("post");
          });

app.put('/api/', (req, res) => {
   res.send("PUT");  
   console.log("update");  
});

 app.delete('/api/delete', (req, res) => {
   res.send("Delete");
   console.log("delete"); 
});





app.listen(port, () => console.log(`Server running on port ${port}`)
);