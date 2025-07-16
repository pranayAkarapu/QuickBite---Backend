import Vendor from "../Models/VendorShema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"

dotenv.config();

const SecretKey = process.env.SECRET_KEY;

export const VendorRegister = async(req, res)=>{
    const {username, email, password} = req.body;
    try{
        const existingVendor = await Vendor.findOne({email});
        if(existingVendor){
            return res.status(400).json({msg: "Vendor already exists"});
        } 
        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });
        await newVendor.save();
        res.status(201).json({message: "Vendor registered successfully"});
        console.log("registered");
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const VendorLogin = async(req, res)=>{
    const {email, password} = req.body;
    if (!email || !password) {
        alert("Please enter both email and password");
         return;
    }
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({vendorID: vendor._id}, SecretKey, {expiresIn:"1h"});
        const vendorId = vendor._id;
        res.status(200).json({message: "Login successfull", token, vendorId});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"}); 
    }
}

export const getallVendors = async(req, res)=>{
    try{
        const vendors = await Vendor.find().populate("firm");
        res.status(200).json({vendors: vendors});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getVendorById = async(req, res)=>{
    const vendorId = req.params.id;
    try{
        const vendor = await Vendor.findById(vendorId).populate("firm");
        if(!vendor){
            return res.status(404).json({message:"vendor not found"});
        }
        //const vendorFirmId = vendor.firm[0]._id;
        const vendorFirmId = vendor.firm?.[0]?._id || null;
        const firmName = vendor.firm?.[0]?.firmName || null;
        res.status(200).json({vendorFirmId, vendor, firmName});
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal server error"});
    }
}