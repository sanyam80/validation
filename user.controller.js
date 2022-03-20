const express = require("express");
const user = require("../models/user.model.js");
const {body,validationResult}=require("express-validator")
const app = express.Router();


app.post("", body("firstName").not().isEmpty().isLength({min:4}).withMessage("more length"),body("email").isEmail().
 custom(async(value)=>{
  const User = await user.findOne({email:value});
  if(User){
      throw new Error("Email is already been taken")
  }
  return true;
 }),
 body("age").not().isEmpty().withMessage("age cannot be empty").isNumeric().withMessage("age must in number").custom((value)=>{
  if(value<1||value>100){
      throw new Error("incorrect age")
  }
  return true;
 }),
 body("password").not().isEmpty().custom((value)=>{
  const passw =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if(!value.match(passw)){
      throw new Error("Password must be strong")
  }
  return true;
 }).custom((value,{req})=>{
     if(value!==req.body.confirmPassword){
         throw new Error("password and confirm password must be match")
     }
     return true;5
 }),
async(req,res)=>{
    try{
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const user1 = await user.create(req.body);
        return res.send({"user":user1})
    }
    catch{
        console.log("somethomg")
        return res.send("something went wrong");
    }
   })

   
   
   
   app.get("",async(req,res) =>{
   
       const User = await user.find().lean().exec()
       return res.send({"users":User})
   
   
   })

   module.exports = app;