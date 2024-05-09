const mongoose = require('mongoose');
const Users  = require("./userModel")

const {Schema} = mongoose;

const groupChatSchema = new Schema({
    name : String,
    Admins : {type : Schema.Types.ObjectId, ref : 'Users'},
    members : [{type : Schema.Types.ObjectId, ref : 'Users'}],
    createdAt : {
        type : Date,
        default : Date.now()
    }
}); 
module.exports = mongoose.model('Group',groupChatSchema );