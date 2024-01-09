const express=require("express");
const jwt=require("jsonwebtoken")
const { DataModel } = require("../model/data.model");

const dataRouter=express.Router()

// get-data route making the get request and send data which matches perticular user
dataRouter.get("/get-data", async(req, res)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "masai");
    try{
        if(decoded){
            let data= await DataModel.find({userId:decoded.userId})
            res.status(200).send(data)

        }else{
            res.status(500).send({msg:"Please Login First"})
        }

    }catch(err){
        res.status(500).json({ error: err });
    }
})

// get-data-details routes making the get request and provide data with the help of data _id
dataRouter.get("/get-data-details/:id", async(req, res)=>{
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  const {id}=req.params
  
  try{
      if(decoded){
          let data= await DataModel.findOne({_id:id})
          res.status(200).send(data)

      }else{
          res.status(500).send({msg:"Please Login First"})
      }

  }catch(err){
      res.status(500).json({ error: err });
  }
})

module.exports={dataRouter}