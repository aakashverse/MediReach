import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { User } from "../models/user";
const router = express.Router();

// signup
router.post("/signup", async(req,res)=>{
    const {name, email, password} = req.body;
    const existing = await User.findOne({email});
    if(existing) return res.status(400).json({message: "user already exists!"});

    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({name, email, password: hashedPassword});

    await user.save();

    res.status(201).json({message: "signup successfull"});
})

// login
router.post("/login", async(req,res)=>{
    const {name, email, password} = req.body();
    const user = await User.findOne({email});
    if(!user) res.status(400).json({message: "Invalid credentials"});
    
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) res.status(400).json({message: "Invalid credentials"});

    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET,{
        expiresIn: '1h'
    });

    res.json({token});
})

export default router;
