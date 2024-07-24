import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
//Correct The Category and brand  String in the model
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mainImage: { type: String, required: true },
    sideImage1: { type: String },
    sideImage2: { type: String },
    category: { type: ObjectId, required: true, ref: "Category" },
    brand: { type: ObjectId, required: true, ref: "Brand" },
    description: { type: String, required: true },
    information: { type: String },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    review: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    url: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
