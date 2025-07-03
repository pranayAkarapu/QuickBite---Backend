import express from "express"
import ProductController from "../Controller/ProductController.js"

const router = express.Router();
router.post("/addProduct/:firmId", ProductController.addProduct);
router.get("/:firmId/products", ProductController.getProductByFirm);

router.get("/uploads/:imageName",(req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', "image/jpeg");
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete("/delete/:productId", ProductController.deleteProductById)

export default router;
