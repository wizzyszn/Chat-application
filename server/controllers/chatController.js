//createChat 
//get user chats
//finding a certain chat
const chatModel = require('../models/chatModel')
module.exports.createChat = async (req,res,next) =>{
    const {firstId,secondId}= req.body;
    try{
    const existingChat = await chatModel.findOne({
        members : {$all : {firstId, secondId}}
    })
    if(existingChat){
        return res.status(200).json({
            existingChat
        })
    }

    const newChat = await chatModel.create({
        members : [firstId,secondId]   
    })
    return res.status(200).json(newChat)
    }catch(err){
        console.log(err);
        next(err);  
        res.status(500).json({
            message : err
        })
    }
}

module.exports.findUserChats = async (req,res,next) =>{
    try{
        const userId = req.params.userId;
const chats = await chatModel.find({ 
    members : {$in : [userId]} 
});
console.log(chats)
if(chats.length < 1){
    return res.status(400).json({
        message : "chats not available with this user"  });
}
return res.status(200).json(chats);
    }catch(err){
        console.log(err) 
        res.status(500).json({
            message : err
        })
    }
    //"65aa0760e10584a5f34932dc
    //65aa07e404b30e6bb48eefa1


}
module.exports.findChat = async (req,res,next) =>{
    try{    

    const {firstId , secondId} = req.params;
    const chat = await chatModel.findOne({
    members : {$all : [firstId,secondId]}
});

return res.status(200).json(chat);
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : err
        })
    }
}