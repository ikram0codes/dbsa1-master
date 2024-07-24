import express from "express";
import {
  getAllDocuments,
  uploadDocument,
  uploadMiddleware,
} from "../controllers/documentController.js";
import { authorized, authorizedAdmin } from "../middleware/authorization.js";

const router = express.Router();

router.post(
  "/upload",
  authorized,
  authorizedAdmin,
  uploadMiddleware,
  uploadDocument
);

router.get("/all/:tag", getAllDocuments); 

export default router;
