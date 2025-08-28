import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { Patient } from "../models/patient.js";
const router = express.Router();


// signup
router.post("/signup", async(req,res)=>{
    try {
      const {name, email, password} = req.body;
    console.log(req.body);
    const existing = await Patient.findOne({email});
    if(existing) return res.status(400).json({message: "user already exists!"});

    const hashedPassword = await bcrypt.hash(password,10);
    const newPatient = new Patient({name, email, password: hashedPassword});

    await newPatient.save();

    return res.status(201).json({
      message: "signup successfull",
      user:{
        name: newPatient.name,
        email: newPatient.email,
      },
    });
    // res.redirect("/");
      
    } catch (error) {
      console.log("Signup error: ",error);
      res.status(501).json({message: "Internal server error"})
    }
})
  
// login
router.post("/login", async(req,res)=>{
    try {
      const {name, email, password} = req.body;
    const newPatient = await Patient.findOne({email});
    if(!newPatient) res.status(400).json({message: "Invalid credentials"});
    
    const isMatch = await bcrypt.compare(password,newPatient.password);
    if(!isMatch) res.status(400).json({message: "Invalid credentials"});
    
    const token = jwt.sign(
      {id: newPatient._id, email: newPatient.email}, 
      process.env.JWT_SECRET,
      {expiresIn: '1h'}
    );
  
    return res.status(200).json({
      message: "Login successfull",
      token,
      user:{
        name: newPatient.name,
        email: newPatient.email,
      },
    });

    // res.redirect("/");
    } catch (error) {
      console.log("Login error: ",error);
      res.status(500).json({message: "Internal server error"}); 
    }
})

export default router;
