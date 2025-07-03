import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import VendorRoutes from "./Routes/VendorRoutes.js";
import FirmRoutes from "./Routes/FirmRoutes.js"
import ProductRoutes from "./Routes/ProductRoutes.js"
import path from "path"

const app = new express();
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection
db.on("open",()=>{
    console.log("connectd to database");
});
db.on("error", ()=>{
    console.log("error connecting to database", error.message);
})

const Port = process.env.PORT || 4000;
app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`);
});

app.use("/vendor", VendorRoutes);
app.use("/firm", FirmRoutes);
app.use("/product", ProductRoutes);
app.use("/uploads", express.static('uploads'));

app.use("/", (req, res)=>{
    res.send("Welcome to QuickBite");
});
