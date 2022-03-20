const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,required:true},
    age:{type:Number,required:true}
},
{versionKey:false,
timestamp:true}
);

const user = mongoose.model("users",userSchema);
module.exports = user;