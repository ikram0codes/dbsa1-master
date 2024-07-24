import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    blog: { type: String, required: true },
    image: { type: String, required: true }

}, { timestamps: true });

const blog = mongoose.model("Blog", blogSchema);
export default blog;