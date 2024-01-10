const express=require("express");
const jwt=require("jsonwebtoken")
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { DataModel } = require("../model/data.model");

const dataRouter=express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "uploads");
  
      // Create the 'uploads' directory
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
  
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniquename = Date.now()
      cb(null, uniquename + file.originalname);
    },
  });
  
  // used built-in module Multer as a middleware for handling file uploads and stored images in uploads directory
  const upload = multer({ storage: storage });

dataRouter.post("/add-data", upload.single("photo"), async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "masai");
    const { name, age, address } = req.body;
   
    const photo = req.file ? req.file.filename : null;
    console.log(name)
    console.log(req.file)
  
    try {
      if(decoded){
          let data=new DataModel({name,age,address, photo, userId:decoded.userId})
          await data.save()
          res.status(200).send({msg:"Data Added Successfully"})
  
      }else{
          res.status(500).send({msg:"Please Login First"})
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

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