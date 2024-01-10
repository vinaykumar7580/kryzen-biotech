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

app.use(express.json());
app.use(cors())



//The below middleware serve static files to frontend.
app.use("/uploads", express.static("uploads"));

//  /user router handle register and login route 
app.use("/user", userRouter);

// /data route handle data route using dataRouter and created get route for DataModel
app.use("/data", dataRouter)



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
