const express=require("express")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const { RegisterModel } = require("../model/register.model");
const userRouter=express.Router()

// /register route use for post request and stored user registration data
userRouter.post("/register", async(req,res)=>{
    const {username, password}=req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(hash){
                let user=new RegisterModel({username, password:hash})
                await user.save();
                res.status(200).send({msg:"User Registration Success"})
            }else{
                res.status(500).send({msg:"User Registration Failed"})
            }
         
        });

    }catch(err){
        res.status(500).send({error:err})

    }
})

// /login route allows user to login and generate token with the help of jsonwebtoken
userRouter.post("/login", async(req,res)=>{
    const {username, password}=req.body;
    const user=await RegisterModel.findOne({username})
    try{
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=>{
                if(result){
                    const token = jwt.sign({ userId: user._id }, 'masai');
                    res.status(200).send({msg:"User Login Success", token})
                }else{
                    res.status(500).send({msg:"User Login Failed"})
                }
            });
        }


    }catch(err){
        res.status(500).send({error:err})
    }
})

// userdata route provide a single user details with the help of _id
userRouter.get("/userdata", async(req,res)=>{
    const token=req.headers.authorization;
    const decoded = jwt.verify(token, 'masai');
    let userID=decoded.userId

    
    try{
        if(decoded){
            let user=await RegisterModel.findOne({_id:userID})
            res.status(200).send(user)
        }else{
            res.status(500).send({msg:"Please Login First"})
        }

    }catch(err){
        res.status(500).send({error:err})
    }
})

module.exports={userRouter}