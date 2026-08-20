import express from 'express';
import { createUser, loginUser, getAllUsers, updateUserStatus, updateUserRole, getCurrentUser, updateUserProfile,updateUserPassword, googleLogin, sendOTP, resetPassword } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/me", getCurrentUser);
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/:pageSize/:pageNumber", getAllUsers);
userRouter.put("/status", updateUserStatus); // Add this line to handle user status updates
userRouter.put("/role", updateUserRole); // Add this line to handle user role updates
userRouter.put("/update" , updateUserProfile)
userRouter.put("/password" , updateUserPassword)
userRouter.post("/google" , googleLogin)
userRouter.post("/otp", sendOTP)
userRouter.post("/reset-password", resetPassword)


export default userRouter;