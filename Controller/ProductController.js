import Firm from "../Models/FirmShema.js";
import Product from "../Models/ProductSchema.js";
import multer from "multer"
import path from "path";

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

const addProduct = async(req, res)=>{
    try{
        const {productName, price, category, bestseller, description} = req.body;
        const image = req.file? req.file.filename : undefined;
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({message: "Firm not found"});
        }
        const product = new Product({
            productName, price, category, bestseller, description, image, firm: firm._id
        });
        const savedProduct = await product.save();
        firm.products.push(savedProduct);
        await firm.save();
        res.status(201).json(savedProduct);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server eroor"})
    }
}

const getProductByFirm = async(req, res)=>{
    try {
        const firmId = req.params.firmId
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ message: "Firm not found" });
        }
        const restaurantName = firm.firmName;
        const products = await Product.find({firm: firmId});
        res.status(200).json({restaurantName, products});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server eroor"})
    }
}

const deleteProductById = async(req, res)=>{
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server eroor"})
    }
}

export default {addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById}

