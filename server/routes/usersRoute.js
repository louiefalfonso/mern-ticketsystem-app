import express from "express";
import { protectRoute, isAdminRoute } from "../middlewares/authMiddleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", protectRoute, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users", protectRoute, isAdminRoute, getAllUsers);
router.put("/profile", protectRoute,isAdminRoute, updateUser);
router.delete("/delete/:id", protectRoute, isAdminRoute, deleteUser);

export default router;
