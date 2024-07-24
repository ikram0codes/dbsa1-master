import express from "express";
import {
  CurrentUserProfile,
  allUsers,
  createUser,
  deleteUser,
  forgetPassword,
  getUser,
  loginUser,
  logoutUser,
  resetPassword,
  updateProfile,
  updateUser,
} from "../controllers/userController.js";
import { authorized, authorizedAdmin } from "../middleware/authorization.js";
const router = express.Router();

router.route("/").post(createUser).get(authorized, authorizedAdmin, allUsers);
  router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router
  .route("/profile/:id")
  .get(authorized, CurrentUserProfile)
  .put(authorized, updateProfile);
router.route("/forgotPassword").post(forgetPassword);
router.route("/resetPassword/:token").put(resetPassword);

router
  .route("/:id")
  .get(authorized, authorizedAdmin, getUser)
  .put(authorized, authorizedAdmin, updateUser)
  .delete(authorized, authorizedAdmin, deleteUser);

export default router;
