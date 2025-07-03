import mongoose from "mongoose";

const vendorShema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firm:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Firm"
        }
    ]
});

const Vendor = mongoose.model("Vendor", vendorShema);
export default Vendor;