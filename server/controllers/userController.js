const userModel  = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator  = require('validator')
const createToken = function(_id){ 
    const jwtkey = process.env.JWT_SECRET_KEY
    return jwt.sign({ _id}, jwtkey, {expiresIn : "3d"})
}
module.exports.userRegister  = async (req,res,next)=>{
    try{
        const {name, email , password} = req.body
        let user = await userModel.findOne({email})
        if(user){
            return res.status(400).json({
                message : "user with Email already exist .."
            })
        }
        if(!name || !email || !password){
            return res.status(400).json({
                message : "All fields are required ...."
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                message : "Email must be a valid email"
            })
        }
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({
                message : "Password must be a strong password...."
            })

        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
       const users =  await userModel.create({
            name : name,
            email : email,
            password : hashedPassword
        });
        const token = createToken(users._id);
        return res.status(200).json({
            _id : users._id,
            name,
            email,
            token
        })
    }
    catch(error){
        next(error)
        console.log(error)
        return res.status(500).json({
            message : error
        })
        }
   
}

module.exports.loginUser = async (req,res,next) =>{
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "Invalid email or password"
            })
            
        }   
        const isValidPassword = await bcrypt.compare(password, user.password) 
        if(!isValidPassword){
            return res.status(400).json({
                message : "Invalid email or password"
            })

        }
        const token = createToken(user._id);
        return res.status(200).json({
            _id : user._id,
            name : user.name,
            email,
            token
        })
    }catch(error){
        next(error)
        console.log(error);
        res.status(500).json({
            message :  error
        })
    }
   
}

module.exports.findUser  = async (req,res,next) =>{
    const userId = req.params.userId;
    try{
        const user = await userModel.findById({_id : userId});
        if(user){
            return res.status(200).json({
                user
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message : err
        })
    }

}

module.exports.getUsers = async (req,res,next) =>{
const userId = req.params.userId
try{
    const users = await userModel.find({_id:{$ne : userId}}, {password : 0});
    if(users){
       console.log("all the users", users)
        return res.status(200).json({
            users
        })
    }

}catch(err){
    next(err)
console.log(err)
return res.status(500).json({
    message : err
})
}
}