// Ladataan express ja otetaan käyttöön
const express = require('express');
const app = express();

// Otetaan .env kansio käyttöön
const dotenv = require ('dotenv').config();
const port = dotenv.parsed.PORT00 || 3000;

// Muodostetaan yhteys MongoDB:n tietokantaan
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://jirihyvonen:${process.env.password}@full-stack-project-2.xfrylca.mongodb.net/?retryWrites=true&w=majority&appName=Full-stack-project-2`);
const Event = require('./events');

// Reitit käyttöön
// const apiRoute = require('./api')
// const database = require('database');
// app.use('/api', apiRoute);
// Middleware
// app.use(express.json());


// Juurireitti
app.get('/', (req, res) => {
    res.send('Hello world');
    console.log("Hello world");
});

// Luodaan CREATE, READ, UPDATE & DELETE (CRUD) endpointit

// GET ALL

app.get('/all', async (req, res) => {
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

// GET BY ID

app.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length != 24){
        return res.status(400).json("väärä id");
    }
    else{
        try{
            const event = await Event.findById(id)
            if (!event){
                return res.status(400).json("Hakemaasi kaveria ei löytynyt");
            }
            else{
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
    

// POST = ADD

app.post('/post',  async (req, res) => {
    const {
        name,
        universe,
        message, 
    } = req.body;

    console.log("Uusi sankari lisätty")
    try {
        const event = new Event({
            name: name,
            universe: universe,
            message: message,
        });
        await event.save();
        res.status(201).json("onnistui");
        console.log("Uusi sankari lisätty");
    }
    catch (error) {
        console.log(err);
        res.status(500).send(error);
    }
});

// UPDATE = PUT

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
            const event = await Event.findByIdAndUpdate(id, {
                name: name,
                universe: universe,
                message: message,
            }, { new: true });

            if (!event) {
                return res.status(404).json("Tapausta ei löydy");
            }
            res.status(200).json();
            console.log("Onnistui täydellisesti");
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
});

// DELETE by ID

 app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    if (id.length !== 24) {
        return res.status(404).json("terveisiä nyt meni väärin");
    }
    else {
        try {
            const event = await Event.findByIdAndDelete(id)
            if (!event){
                return res.status(404).json("ei löytynyt");
            }
            else{
                const message = "Sankari poistettu!";
                res.status(200).json({ message });
                console.log("Onnistunut poistotapahtuma");
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