const mongoose=require("mongoose")

const registerSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    }
},{
    versionKey:false
})

const RegisterModel=mongoose.model("register", registerSchema)

module.exports={RegisterModel}