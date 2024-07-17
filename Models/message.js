const mongoose = require('mongoose')
const  {Schema, model} =  require('mongoose')

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Message = model('Message', messageSchema);

module.exports = Message;