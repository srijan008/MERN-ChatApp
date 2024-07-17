const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const convSchema = new Schema({
    participants: [{ // Corrected to an array of ObjectId references
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [{ // Corrected to an array of ObjectId references
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }]
}, { timestamps: true }); // Corrected the option name to 'timestamps'

const Conversation = model('Conversation', convSchema);

module.exports = Conversation;
