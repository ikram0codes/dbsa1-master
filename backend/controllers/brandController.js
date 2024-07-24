import asyncHandler from "../middleware/ErrorHandler.js";
import Brand from "../model/brandSchema.js";

export const createBrand = asyncHandler(async (req, res) => {
  const { name, image } = req.fields;
  if (!name) {
    res.status(401);
    throw new Error("Name is Required");
  }
  const existingBrand = await Brand.findOne({ name });
  if (existingBrand) {
    res.status(409);
    throw new Error("Brand already exists");
  }
  const brand = await new Brand({ name, image: image }).save();
  res.status(200).json(brand);
});

export const updateBrand = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.fields;
  if (!name) {
    res.status(400);
    throw new Error("Name is Required");
  }
  const brand = await Brand.findById(id);
  if (!brand) {
    res.status(404);
    throw new Error("brand not exists");
  }
  const newBrand = await Brand.findByIdAndUpdate(
    req.params.id,
    { ...req.fields },
    { new: true }
  );
  if (!newBrand) {
    res.status(404);
    throw new Error("brand not found");
  }

  res.status(200).json(newBrand);
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const brand = await Brand.findById(id);
  if (!brand) {
    res.status(404);
    throw new Error("brand not exists");
  }
  await Brand.findByIdAndDelete(id);
  res.status(200).json({ message: "Brand deleted successfully" });
});

export const getAllBrand = asyncHandler(async (req, res) => {
  const allBrand = await Brand.find({});
  if (!allBrand) {
    res.status(404);
    throw new Error("no any brand found");
  }
  res.status(200).json({ allBrand });
});
