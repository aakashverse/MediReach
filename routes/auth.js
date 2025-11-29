import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { Patient } from "../models/patient.js";
const router = express.Router();


// signup
router.post("/signup", async(req,res)=>{
    try {
      const {name, email, password, bloodGroup, age, height, weight, allergies, medicalConditions} = req.body;
    console.log(req.body);
    const existing = await Patient.findOne({email});
    if(existing) return res.status(400).json({message: "user already exists!"});

    const hashedPassword = await bcrypt.hash(password,10);
    const newPatient = new Patient({name, email, password: hashedPassword, bloodGroup, age, height, weight, allergies, medicalConditions});

    await newPatient.save();

    return res.status(201).json({
      message: "signup successfull",
      user:{
        name: newPatient.name,
        email: newPatient.email,
        bloodGroup: newPatient.bloodGroup,
        age: newPatient.age,
        height: newPatient.height,
        weight: newPatient.weight,
        allergies: newPatient.allergies,
        medicalConditions: newPatient.medicalConditions,
      },
    });
    // res.redirect("/");
      
    } catch (error) {
      console.log("Signup error: ",error);
      res.status(501).json({message: "Internal server error"})
    }
})
  
// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: patient._id, email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: patient.name,
        email: patient.email,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
