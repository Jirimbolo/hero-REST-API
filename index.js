// Ladataan express ja otetaan käyttöön
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Otetaan .env kansio käyttöön
const dotenv = require ('dotenv').config();
const port = dotenv.parsed.PORT00 || 3000;

// Muodostetaan yhteys MongoDB:n tietokantaan
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://jirihyvonen:${process.env.password}@full-stack-project-2.xfrylca.mongodb.net/?retryWrites=true&w=majority&appName=Full-stack-project-2`);
const Event = require('./events');

// Reitit käyttöön imuroimalla
// const apiRoute = require('./api')
// const database = require('database');
// app.use('/api', apiRoute);


// Juurireitti
app.get('/', (req, res) => {
    res.send('Hello world');
    console.log("Hello world");
});

// Luodaan CREATE, READ, UPDATE & DELETE (CRUD) endpointit

// GET ALL metodi

app.get('/getall', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
        console.log("sending all data")
    }
    catch (error){
        console.log(error);
        res.status(500).send
    }
});

// GET BY ID metodi

app.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24){
        return res.status(400).json("Väärä id");
    }
    else{
        try{
            const event = await Event.findById(id);
            if (!event){
                return res.status(400).json("Hakemaasi kaveria ei löytynyt");
            }
            else {
                res.status(200).send(event);
                console.log("Tässä sankarisi");
            }
        }
        catch(error){
            console.log(error);
            res.status(500).send(error);
        }
    }
});
   
// POST = ADD metodi

app.post('/add',  async (req, res) => {
    const { name, universe, message } = req.body;
    console.log("Uusi sankari muodostettu")
    try {
        const Event = new Event({name: name, universe: universe, message: message});
        await Event.save();
        res.status(201).json("Sinne meni" + name);
        console.log("Uusi sankari lisätty");
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// UPDATE = PUT metodi

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
        return res.status(404).json("jotain väärin");
    }
    else {
        const {
            name,
            universe,
            message
        } = req.body;

        try {
            const event = await Event.findByIdAndUpdate(id, {name: name, universe: universe, message: message}, { new: true });
            if (!event) {
                return res.status(404).json("Sankaria ei löydy");
            } else {
            res.status(200).json();
            console.log("Onnistui täydellisesti");
        }
    }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
});

// DELETE by ID metodi

 app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
        return res.status(404).json("Väärä ID");
    }
    else {
        try {
            const event = await Event.findByIdAndDelete(id);
            if (!event){
                return res.status(404).json("Hakemaasi kaveria ei löytynyt");
            }
            else{
                const message = "Sankari poistettu!";
                res.status(200).json();
                console.log("Onnistunut poisto");
            }
            }
            catch(error){
                console.log(error);
                res.status(500).send(error);
            }
        }
});



// Serveri päälle

app.listen(port, () => console.log(`Server running on port ${port}`)
);