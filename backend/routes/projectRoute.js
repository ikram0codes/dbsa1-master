import express from "express";
import { authorized, authorizedAdmin } from "../middleware/authorization.js";
import { allProjects, createProject, deleteProject, projectById, updateProject } from "../controllers/projectController.js";
const router = express.Router();


router.route("/").post(authorized, authorizedAdmin, createProject);
router.route("/allProject").get(allProjects);
router.route("/:id").put(authorized, authorizedAdmin, updateProject).delete(authorized, authorizedAdmin, deleteProject).get(projectById);

export default router;
