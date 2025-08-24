import jwt from "jsonwebtoken"

export function verifyToken(req,res,next){
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message: "Access Denied!"})

    try{
        const verified = jwt.verify(token,process.env.JSON_SECRET);
        req.user = verified;
    }catch(err){
        res.status(400).json("Invalid Credidentials!");
    }
}