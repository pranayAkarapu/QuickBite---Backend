import express from "express";
import {VendorRegister, VendorLogin, getallVendors, getVendorById} from "../Controller/VendorController.js";

const Router = express.Router();

Router.post("/register", VendorRegister);
Router.post("/login", VendorLogin);
Router.get("/get-vendors", getallVendors);
Router.get("/allVendors/:id", getVendorById)

export default Router;
