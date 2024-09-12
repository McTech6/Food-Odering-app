import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"
import dotenv from 'dotenv'

dotenv.config()


export const loginUser = async(req,res)=>{
    const {email, password} = req.body
    try {

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, msg: "User not found"})
        }

        const ismatch = await bcrypt.compare(password, user.password)
        if(!ismatch){
            return res.json({success: false, msg: "Incorrect password or Email"})
        }

        const token =createToken(user._id)
        res.json({success: true, token, msg:"User logged in successfully"})
        
    } catch (error) {
        res.json({success: false, msg: "Could not Login User"}) 
       console.log(error)   
    }

   
}

const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '5h'})
}


export const registerUser =async(req,res)=>{
    const {name, password,email}=req.body
     
    try {
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, msg: "User already exist"})
        }

        if(!validator.isEmail(email)){
            return res.json({success: false, msg: "Invalid Email "})
        }

        if(password.length<8){
            return res.json({success: false, msg: "Password must be at least 8 characters"})
        }

        const hashedPassword = await  bcrypt.hash(password,10)

        const newUser = new userModel({name,email,password:hashedPassword})

      const user =  await newUser.save()
      const token = createToken(user._id)
        res.json({success: true,token, msg:"User saved successfully"})
        
    } catch (error) {
       res.json({success: false, msg: "Could not Register User"}) 
       console.log(error)
    }
}