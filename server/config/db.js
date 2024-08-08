import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const COOKIE_MAX_AGE = 1 * 24 * 60 * 60 * 1000; // 1 day

export const createJWT = (res, userId) => {
  if (!res || !userId) {
    throw new Error("Invalid input: res and userId are required.");
  }

  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: COOKIE_MAX_AGE,
    });
  } catch (err) {
    console.error("Error creating JWT:", err);
    // returning an error response
  }
};

export default connectDB;
