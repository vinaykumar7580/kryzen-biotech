const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt=require("jsonwebtoken")
const { connection } = require("./db");
const { userRouter } = require("./routes/register.routes");
const { DataModel } = require("./model/data.model");

const app = express();

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

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/user", userRouter);




app.post("/add-data", upload.single("photo"), async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");
  const { name, age, address } = req.body;
  const photo = req.file.filename;

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

app.get("/get-data", async(req, res)=>{
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

app.get("/get-data-details/:id", async(req, res)=>{
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

app.listen(8080, async () => {
  try {
    await connection;
    console.log("database is connected");
  } catch (err) {
    console.log(err);
    console.log("database not connected");
  }
});
