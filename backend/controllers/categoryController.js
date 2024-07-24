import asyncHandler from "../middleware/ErrorHandler.js";
import Category from "../model/categoryModel.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, startingPrice, image } = req.fields;

    if (!name) {
      res.status(401);
      throw new Error("Name is Required");
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(409);
      throw new Error("Category already exists");
    }

    const category = await Category.create({
      name,
      startingPrice,
      image: image,
    });

    res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.fields;
  if (!name) {
    res.status(400);
    throw new Error("Name is Required");
  }
  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("category not exists");
  }
  const newCategory = await Category.findByIdAndUpdate(
    req.params.id,
    { ...req.fields },
    { new: true }
  );
  if (!newCategory) {
    res.status(404);
    throw new Error("category not found");
  }

  res.status(200).json(newCategory);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("category not exists");
  }
  await Category.findByIdAndDelete(id);
  res.status(200).json({ message: "Category deleted successfully" });
});

export const getAllCategory = asyncHandler(async (req, res) => {
  const allCategory = await Category.find({});
  if (!allCategory) {
    res.status(404);
    throw new Error("no any category found");
  }
  res.status(200).json({ allCategory });
});

export const readCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("category not exists");
  }
  res.status(200).json(category);
});
