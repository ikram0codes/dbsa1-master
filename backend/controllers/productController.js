import asyncHandler from "../middleware/ErrorHandler.js";
import Product from "../model/productModel.js";
import cache from "memory-cache";

// Add a new product
export const addProduct = asyncHandler(async (req, res) => {
  const { name, price, category, brand, description, information } = req.fields;

  if (!name || !price || !category || !brand || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const product = await new Product({ ...req.fields }).save();
  res.status(201).json(product);
});

// Update an existing product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, category, brand, description, quantity } = req.fields;

  if (!name || !price || !category || !brand || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { ...req.fields },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Clear cache for this product
  cache.del(`product_${id}`);

  res.status(200).json(updatedProduct);
});

// Delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Clear cache for this product
  cache.del(`product_${id}`);

  res.status(200).json(product);
});

// Fetch six products
export const fetchSixProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  let products = cache.get("sixProducts");
  if (!products) {
    const count = await Product.countDocuments({ ...keyword });
    products = await Product.find({ ...keyword }).limit(pageSize);

    // Cache for 1 hour (adjust as needed)
    cache.put("sixProducts", products, 3600000);
  }

  res.status(200).json({
    page: 1,
    products,
    pages: Math.ceil(count / pageSize),
    hasMore: false,
  });
});

// Fetch a product by ID
export const fetchProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let product = cache.get(`product_${id}`);
  if (!product) {
    product = await Product.findById(id).populate("brand", "name");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Cache for 1 hour (adjust as needed)
    cache.put(`product_${id}`, product, 3600000);
  }

  res.status(200).json(product);
});

// Get all products
export const getAllProduct = asyncHandler(async (req, res) => {
  let products = cache.get("allProducts");
  if (!products) {
    products = await Product.find({});
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    // Cache for 1 hour (adjust as needed)
    cache.put("allProducts", products, 3600000);
  }

  res.status(200).json(products);
});

// Add a review for a product
export const addProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ error: "Rating and comment are required" });
  }

  let product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const alreadyReviewed = product.review.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    product.review = product.review.filter(
      (r) => r._id !== alreadyReviewed._id
    );
  }

  const review = {
    user: req.user._id,
    comment,
    rating: Number(rating),
    name: req.user.username,
    email: req.user.email,
  };

  product.review.push(review);
  product.numReviews = product.review.length;
  product.rating =
    product.review.reduce((acc, item) => acc + item.rating, 0) /
    product.review.length;

  await product.save();

  // Clear cache for this product
  cache.del(`product_${id}`);

  res.status(201).json(product);
});

// Fetch top rated products
export const fetchTopProducts = asyncHandler(async (req, res) => {
  let products = cache.get("topProducts");
  if (!products) {
    products = await Product.find({}).sort({ rating: -1 }).limit(6);
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    // Cache for 1 hour (adjust as needed)
    cache.put("topProducts", products, 3600000);
  }

  res.status(200).json(products);
});

// Fetch newest products
export const fetchNewProducts = asyncHandler(async (req, res) => {
  let products = cache.get("newProducts");
  if (!products) {
    products = await Product.find({}).sort({ _id: -1 }).limit(6);
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    // Cache for 1 hour (adjust as needed)
    cache.put("newProducts", products, 3600000);
  }

  res.status(200).json(products);
});

// Filter products by category, brand, price range, keyword, and pagination
export const categoryProduct = asyncHandler(async (req, res) => {
  const { brand, category, lowPrice, highPrice, keyword, page } = req.query;
  const limit = 6;
  const filtered = [];

  if (brand) {
    const brands = brand.split(",");
    filtered.push({ brand: { $in: brands } });
  }

  if (category) {
    const categories = category.split(",");
    filtered.push({ category: { $in: categories } });
  }

  if (lowPrice && highPrice) {
    filtered.push({ price: { $gte: lowPrice, $lte: highPrice } });
  } else if (lowPrice) {
    filtered.push({ price: { $gte: lowPrice } });
  } else if (highPrice) {
    filtered.push({ price: { $lte: highPrice } });
  }

  if (keyword) {
    filtered.push({ name: { $regex: keyword, $options: "i" } });
  }

  const skip = (page - 1) * limit;
  let finalFilter = {};

  if (filtered.length > 0) {
    finalFilter = { $and: filtered };
  }

  const products = await Product.find(finalFilter).skip(skip).limit(limit);
  const numOfProducts = await Product.find(finalFilter).countDocuments();

  res.json({ products, numOfProducts });
});
