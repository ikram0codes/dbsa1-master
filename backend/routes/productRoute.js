import express from "express";
import formidable from "express-formidable"

const router = express.Router();
import { authorized, authorizedAdmin } from "../middleware/authorization.js"
import { addProduct, addProductReview, categoryProduct, deleteProduct, fetchNewProducts, fetchProductById, fetchSixProducts, fetchTopProducts, getAllProduct, updateProduct } from "../controllers/productController.js";
import checkId from "../middleware/checkId.js";

router.get("/products/allProduct", getAllProduct);
router.route("/filteredProducts").get(categoryProduct);
router.route("/").post(authorized, authorizedAdmin, formidable(), addProduct).get(fetchSixProducts);
router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.route("/:id/reviews").post(authorized, checkId, addProductReview);
router.route("/:id").get(fetchProductById).put(authorized, authorizedAdmin, formidable(), updateProduct).delete(authorized, authorizedAdmin, deleteProduct);


export default router; 