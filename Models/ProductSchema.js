import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    category:{
        type:[{
            type:String,
            enum:["Veg", "Non-Veg"]
        }]
    },
    image:{
        type:String
    },
    bestseller:{
        type: String
    },
    description:{
        type:Boolean
    },
    firm:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Firm"
    }]
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;   