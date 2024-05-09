const groupChatModel  = require("../models/groupChatModel");
//create a group chat
module.exports.createGroupChat = async (req,res) =>{
    const {name,membersId, AdminId} = req.body;
    console.log("name : ", name)
    if(!name){
        return res.status(400).json(
            'Please provide a name for the group'
        )
    }
    const members =  membersId.filter((mem) =>{
        return  mem !== AdminId
    })
    try{
       const groupChat = await groupChatModel.create({
        name,
        Admins : AdminId,
        members : [AdminId, ...members]
    })
    console.log("groupChat : ", groupChat)
    if(groupChat){
        res.status(200).json(
            groupChat
        )
    }
  

    }catch(err){
        console.log(err)
        res.status(400).json({
            error : err
        })
    }

}
// find a group chat
module.exports.findGroupChat = async (req,res) =>{
  const {groupChatId} = req.params;
  try{  
    const groupChatDoc = await groupChatModel.findById(groupChatId).populate('members').populate('Admins')
    if(groupChatDoc){
        res.status(200).json({
            groupChatDoc
        })
    }
  }catch(err){
    console.log(err);
    res.status(400).json({
        error : err
    })

  }
    
}

// get all group chats
module.exports.getAllGroupsChat = async (req,res) =>{
    const {userId} = req.params
    try{
        const groupChats = await groupChatModel.find({members : userId});
        if(groupChats){
            res.status(200).json(
                groupChats
            )

        }else {
            res.status(404).json({
                message: "No group chats found for the user."
            });
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            error  :err
        })

    }
    

}
//Add an new Member
module.exports.addNewMembers = async(req,res) =>{
    const {AdminId, membersId,groupChatId} = req.body
    const groupChat = await groupChatModel.findById(groupChatId);
    try{
        if(groupChat.Admins.equals(AdminId)){
            groupChat.members.push(...membersId)
           await groupChat.save();
           res.status(200).json({
            groupChat
        }) 
        }
        else {
            res.status(400).json({
                message : "This User Doesn't have the required Priviledges to perform this task"
            })
        }
             
    }catch(err){
        console.log(err)
        res.status(400).json({
            error : err
        })

    }

}
//delete a user
module.exports.removeMember = async(req,res) =>{
    console.log("run")
    const {AdminId, memberId, groupChatId} = req.body;
    const groupChat = await groupChatModel.findById(groupChatId);
    try {
        if (groupChat.Admins.equals(AdminId)) {
            let  index = groupChat.members.indexOf(memberId);
            if (index !== -1) {
                groupChat.members.splice(index, 1);
                await groupChat.save();
                res.status(200).json({
                    groupChat
                });
            } else {
                res.status(400).json({
                    message: "The member ID was not found in the group chat members."
                });
            }
        } else {
            res.status(400).json({
                message: "This user doesn't have the required privilege to perform this operation."
            });
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            error : err
        })

    }

}
//delete group chat
module.exports.deleteGroupChat = async (req,res) =>{
    const {groupChatId, AdminId} = req.body;
    const groupChat = await groupChatModel.findById(groupChatId);
    if(groupChat.Admins.equals(AdminId)){
        await groupChatModel.findByIdAndDelete(groupChatId);
        res.status(200).json({
            message : "Group Chat deleted succesfully"
        })
    }
}