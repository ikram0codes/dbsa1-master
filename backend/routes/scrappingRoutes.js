import express from "express";
import { authorized, authorizedAdmin } from "../middleware/authorization.js";
import {
  saveProduct,
  scrappeAbbWebsite,
  scrappeChintGlobalWebsite,
  scrappeSEWebsite,
} from "../controllers/scrappingController.js";
const router = express.Router();

router.post(
  "/chintglobal",
  authorized,
  authorizedAdmin,
  scrappeChintGlobalWebsite
);

router.post("/abb", authorized, authorizedAdmin, scrappeAbbWebsite);

router.post("/se", authorized, authorizedAdmin, scrappeSEWebsite);

router.post("/saveproduct", authorized, authorizedAdmin, saveProduct);

export default router;
