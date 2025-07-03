import mongoose from "mongoose";

const FirmShema = mongoose.Schema({
    firmName:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[String],
        enum:["Veg","Non-Veg"],
        required:true
    },
    region:{
        type:[String],
        enum:["South-Indian","North-Indian","Chinese","Bakery"],
        required:true
    },
    offer:{
        type:String
    },
    image:{
        type:String,
    },
    vendor:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    }],
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
});

const Firm = mongoose.model("Firm", FirmShema);
export default Firm;

