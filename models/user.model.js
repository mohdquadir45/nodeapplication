const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
module.exports = mongoose.model('User', {
   
    username: { type: String, required: true },
    id:{type:String,default:uuidv4()},
    age: { type: Number, required: true },
    hobbies: { type: [String], default: [] },
})