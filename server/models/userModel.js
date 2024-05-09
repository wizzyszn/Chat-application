const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    name : {
        type: String,
        required : true,
        minlength : 3,
        maxlength : 30,
    },
    email : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 200,
        unique : true
    },
    password: {
        type : String,
        unique : true,
        required : true
    }
}, {timestamps : true});

module.exports = mongoose.model('Users', userSchema)