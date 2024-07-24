import express from "express";
import { authorized, authorizedAdmin } from "../middleware/authorization.js";
import { allBlogs, blogById, createBlog, deleteBlog, updateBlog } from "../controllers/blogController.js";
const router = express.Router();

router.route("/").post(authorized, authorizedAdmin, createBlog);
router.route("/allBlogs").get(allBlogs);
router.route("/:id").put(authorized, authorizedAdmin, updateBlog).get(blogById).delete(authorized, authorizedAdmin, deleteBlog);

export default router;