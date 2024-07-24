import express from "express";
import { createImageHotSpots } from "../controllers/tooltipController.js";
import { authorized, authorizedAdmin } from "../middleware/authorization.js";
const router = express.Router();

router.post("/create", authorized, authorizedAdmin, createImageHotSpots);

export default router;
