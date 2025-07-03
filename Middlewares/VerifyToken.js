import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Vendor from "../Models/VendorShema.js";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const VerifyToken = async(req, res, next)=>{

    const token = req.headers.token;

    if(!token){
        return res.status(401).json({message:"Token is required"})
    }
    try{
        const decoded = jwt.verify(token, secretKey);
        const vendor = await Vendor.findById(decoded.vendorID);
        if(!vendor){
            return res.status(404).json({message:"vendor not found"})
        }
        req.vendorId = vendor._id;
        next();

    }catch(error){
        return res.status(500).json({message: "Invalid token"})
    }
}

export default VerifyToken;