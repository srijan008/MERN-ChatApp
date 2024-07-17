const mongoose = require('mongoose')
const  {Schema, model} =  require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        default: ''  
    }
    
}, { timestamps: true });

const User = model("User", userSchema);

module.exports = User;
