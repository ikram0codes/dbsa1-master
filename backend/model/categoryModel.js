import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
        unique: true
    },
    startingRate: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true
    }
})

const category = mongoose.model("Category", categorySchema);
export default category;