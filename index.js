import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";
import authenticateUser from './middlewares/authenticate.js';
import productRouter from './routes/productRouter.js';
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri).then(
    () => {
        console.log("Connected to MongoDB");
    }
);

const app = express(); 

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.use(authenticateUser); //use the authentication middleware for all routes

app.use('/users', userRouter);
app.use('/products', productRouter);

app.listen(3000, 
    () => {
        console.log("Server is running...");
    }
); 