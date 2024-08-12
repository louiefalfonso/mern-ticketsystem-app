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

router.post("/register",registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/profile", updateUser);

export default router;
