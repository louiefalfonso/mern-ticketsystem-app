import User from "../models/User.js";
import { createJWT } from "../config/db.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;

    // Validate input data
    if (!name || !email || !password || !role || !title) {
      return res.status(400).json({
        status: false,
        message: "Invalid user data",
      });
    }

    // Check if email is already in use
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false, // Set isAdmin to false by default
      role,
      title,
    });

    if (user) {
      createJWT(res, user._id);
      user.password = undefined;
      res.status(201).json(user);
    } else {
      return res.status(400).json({
        status: false,
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    if (!user?.isActive) {
      return res.status(401).json({
        status: false,
        message: "User account has been deactivated, contact the administrator",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    createJWT(res, user._id);

    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Check if token exists in cookie
    if (!req.cookies.token) {
      return res
        .status(200)
        .json({ message: "No token found, logout successful" });
    }

    // Delete token from cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Add secure flag to ensure cookie is deleted over HTTPS
      sameSite: "strict", // Add sameSite flag to prevent CSRF attacks
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id, name, title, role, email } = req.body;

    // Validate input data
    if (!name || !title || !role || !email) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user data" });
    }

    const id = isAdmin && userId === _id ? userId : isAdmin && userId !== _id ? _id : userId;

    // Use findByIdAndUpdate to update user in a single database query
    const updatedUser = await User.findByIdAndUpdate(id, { name, title, role, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    updatedUser.password = undefined;

    res.status(201).json({
      status: true,
      message: "Profile Updated Successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name title role email isActive");

    if (!users) {
      return res.status(404).json({
        status: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};