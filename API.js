const express = require('express');
const Event = require('events');
const api = express.Router();


//luodaan seuraavanlaiset (CRUD) reitit
//GET ALL
//GET by ID
//POST
//DELETE

// GET ALL
app.get('/', function (req, res) {
    console.log("Get all aka READ");
});
// Get by ID
app.get('/:id', function (req, res) {
    console.log("Get by id aka READ");
});
// POST
app.get('/create', function (req, res) {
    console.log("Create new");
});
// PUT
app.get('/update', function (req, res) {
    console.log("Update");
});
// DELETE by ID
app.get('/delete', function (req, res) {
    console.log("Delete by ID");
});