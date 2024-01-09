const mongoose=require("mongoose")
require("dotenv").config()

// create connection with mongodb database
const connection=mongoose.connect(process.env.mongoURL)

module.exports={connection}