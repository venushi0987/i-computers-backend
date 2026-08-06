import express from 'express';
import { createUser, loginUser, getAllUsers, updateUserStatus, updateUserRole, getCurrentUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/me", getCurrentUser);
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/:pageSize/:pageNumber", getAllUsers);
userRouter.put("/status", updateUserStatus); // Add this line to handle user status updates
userRouter.put("/role", updateUserRole); // Add this line to handle user role updates

export default userRouter;