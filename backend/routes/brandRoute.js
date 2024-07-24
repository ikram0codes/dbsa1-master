import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { authorized, authorizedAdmin } from "../middleware/authorization.js"
import { createBrand, deleteBrand, getAllBrand, updateBrand } from "../controllers/brandController.js";

router.route("/").post(authorized, authorizedAdmin, formidable(), createBrand).get(getAllBrand);
router.route("/:id").put(authorized, authorizedAdmin, formidable(), updateBrand).delete(authorized, authorizedAdmin, deleteBrand);

export default router; 