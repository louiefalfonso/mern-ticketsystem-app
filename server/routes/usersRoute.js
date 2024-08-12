import express from "express";
import { protectRoute, isAdminRoute } from "../middlewares/authMiddleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  updateUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users", protectRoute, isAdminRoute, getAllUsers);
router.put("/profile", protectRoute,isAdminRoute, updateUser);

export default router;
