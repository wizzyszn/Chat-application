const groupChatModel = require('../models/groupChatModel');
const groupMessageModel = require('../models/groupMessagesModel') 
//create Messages
module.exports.createMessages = async (req,res) =>{
    const {group,sender,content} = req.body;
    try{
        const msgDocument = await groupMessageModel.create({
            group,
            content,
            sender,
        }) ;

        res.status(200).json({msgDocument})

    }catch(err){
        console.log(err);
        res.status(400).json({
            error : err
        })

    }
}
//getMessages
module.exports.getMessages = async (req,res) =>{
    const {groupChatId} = req.params
    console.log(groupChatId)
    try{
        const msgDocument = await groupMessageModel.findOne({group : groupChatId}).populate('group sender');
        console.log(msgDocument);
        if(msgDocument){
           return res.status(200).json({msgDocument});
          
        }else{
            return   res.status(400).json({message : "No Messages yet"})
        }

    }catch(err){
        console.log(err);
        res.status(400).json({
            error : err
        })
    }
}

// create pinned message
module.exports.pinnedMessage = async (req,res) =>{
    const {Admin,groupChatId,messageId} = req.params;

    try{
        const groupChat = await groupChatModel.findById(groupChatId);
        if(groupChat.Admins.equals(Admin)){
            const pinnedMsg = await groupMessageModel.findById(messageId).populate('sender');
            res.status(200).json({
                pinnedMsg
            })
        }else {
            return res.status(400).json({
                message : "This user is not privilege"
            })

        }
       
    }catch(err){
        console.log(err);
        res.status(400).json({
            error : err
        })

    }
}
