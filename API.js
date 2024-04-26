// const express = require('express');
// const router = express.Router();
// const event = require('./events');

//luodaan seuraavanlaiset (CRUD) reitit: Juuri, GET ALL, GET by ID, POST, PUT & DELETE
router.get('/', (req, res) => {
    res.send('Hello world');
    console.log("Hello world");
});

router.get('/all', (req, res) => {
    res.send('Get all');
    console.log("getAll");
});

router.get('/:1', (req, res) => {
    res.send("id 1");
    console.log("getID")
});

router.post('/post', (req, res) => {
    res.send("POST");
    console.log("post");
});

router.put('/put', (req, res) => {
    res.send("PUT");  
    console.log("update");  
});

 router.delete('/delete/:id', (req, res) => {
    res.send("Delete");
    console.log("delete"); 
});

// module.exports = router;