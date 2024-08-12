import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { loginUser, logoutUser, registerUser, getAllUsers, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users", getAllUsers);
router.put("/profile", protectRoute, updateUser);
router.post("/register", registerUser);

export default router;
