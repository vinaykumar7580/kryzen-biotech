const express=require("express")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const { RegisterModel } = require("../model/register.model");
const userRouter=express.Router()

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

module.exports={userRouter}