import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
})

const brand = mongoose.model("Brand", brandSchema);
export default brand;