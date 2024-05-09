const messageModel= require("../models/messageModel");

//createMessage

module.exports.createMessage = async(req,res) =>{
    const {chatId , senderId ,text } = req.body
    console.log(chatId, senderId, text)

   
    try{
        const message = await messageModel.create({
            chatId,
            senderId,
            text
        })
        res.status(200).json(message)
    

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

}
//getMessages

module.exports.getMessages = async (req,res,next) =>{
    const {chatId} = req.params;
    console.log(chatId)
    try{
        const messages = await messageModel.find({
            chatId
        })
        res.status(200).json(messages)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }

}