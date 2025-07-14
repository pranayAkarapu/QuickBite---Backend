import Firm from "../Models/FirmShema.js";
import Vendor from "../Models/VendorShema.js";
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({storage: storage});

const addFirm = async(req, res)=>{
    const {firmName, area, category, region, offer} = req.body;
    const image = req.file? req.file.filename: undefined;

    try{
        const vendor = await Vendor.findById(req.vendorId);
        if(!vendor){
            return res.status(404).json({message:"Vendor not found"});
        }
        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });
        const savedfirm = await firm.save();
        const firmIdresponse = savedfirm._id;
        vendor.firm.push(savedfirm);
        await vendor.save();

        res.status(200).json({message:"Firm added successfully", firmIdresponse});
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal server error"});
    }
}

const deleteFirmById = async(req, res)=>{
    try {
        const FirmId = req.params.firmId;
        const deletedFirm = await Product.findByIdAndDelete(FirmId);
        if(!deletedFirm){
            return res.status(404).json({message: "Firm not found"});
        }
        res.status(200).json({message: "Firm deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server eroor"})
    }
}

export default {addFirm:[upload.single('image'), addFirm], deleteFirmById};

