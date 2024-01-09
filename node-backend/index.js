const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt=require("jsonwebtoken")
const { connection } = require("./db");
const { userRouter } = require("./routes/register.routes");
const { DataModel } = require("./model/data.model");
const { dataRouter } = require("./routes/data.routes");

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

// used built-in module Multer as a middleware for handling file uploads and stored images in uploads directory
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
//The below middleware serve static files to frontend.
app.use("/uploads", express.static("uploads"));

//  /user router handle register and login route 
app.use("/user", userRouter);

// /data route handle data route using dataRouter and created get route for DataModel
app.use("/data", dataRouter)


// /add-data route Added data to database using post request
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


//runing the server on port 8080
app.listen(8080, async () => {
  try {
    await connection;
    console.log("database is connected");
  } catch (err) {
    console.log(err);
    console.log("database not connected");
  }
});
