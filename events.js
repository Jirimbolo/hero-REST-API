// Tänne eventSchema
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    universe: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Event', eventSchema);