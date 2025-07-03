import express from "express";
import  FirmController  from "../Controller/FirmController.js";
import VerifyToken from "../Middlewares/VerifyToken.js";

const router = express.Router();
router.post("/add-Firm", VerifyToken,FirmController.addFirm);

router.get("/uploads/:imageName",(req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', "image/jpeg");
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});
router.delete("/:firmId", FirmController.deleteFirmById)

export default router;
