import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";
import authenticateUser from './middlewares/authenticate.js';
import productRouter from './routes/productRouter.js';

const mongoUri = "mongodb://admin:1234@ac-zlls1pw-shard-00-00.2957iyh.mongodb.net:27017,ac-zlls1pw-shard-00-01.2957iyh.mongodb.net:27017,ac-zlls1pw-shard-00-02.2957iyh.mongodb.net:27017/i-computers?ssl=true&replicaSet=atlas-feanqd-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(mongoUri).then(
    () => {
        console.log("Connected to MongoDB");
    }
);

const app = express(); 

app.use(express.json());

app.use(authenticateUser); //use the authentication middleware for all routes

app.use('/users', userRouter);
app.use('/products', productRouter);

app.listen(3000, 
    () => {
        console.log("Server is running...");
    }
); 