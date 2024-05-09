const mongoose =require('mongoose');
const Group = require('./groupChatModel')
const Users  = require("./userModel")
const {Schema} = mongoose;

const groupMessageSchema = new Schema({
   group :{
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'Group'
   },
   content :{
    type : String,
    required: true
   },
   sender : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Users",
    required :true
   },
   pinned : {
      type : String
   }


}, {timestamps : true});

module.exports = mongoose.model('GroupMessage', groupMessageSchema);

