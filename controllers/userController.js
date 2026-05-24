import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export async function createUser(req, res) {
    try {
        const password = req.body.password;
        const passwordHash = bcrypt.hashSync(password, 10);
        const user = new User(
            {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: passwordHash
            }
        );
        await user.save(); //save the user to the database.
        res.json({ message: "User created successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
}

export async function loginUser(req, res) { //create login function
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });

        if ( user == null){
            res.status(404).json({ message: "User not found" }); 
            return;
        }

        const isPasswordMatching = bcrypt.compareSync(password, user.password);

        if (isPasswordMatching) {
            //res.status(200).json({ message: "Login successful" });

            const userInfo = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                emailVerified: user.emailVerified,
                isAdmin: user.isAdmin,
                isBlocked: user.isBlocked,
            };

            const token = jwt.sign(userInfo, JWT_SECRET); //create user token
            res.json({ token: token }); //send the token to the client

        } else {
            res.status(401).json({ message: "Invalid password" });
        };
        
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export function isAdmin(req, res) {
    if(req.user == null) {
        return false;
    }

    if(!req.user.isAdmin) {
        return false;
    }

    return true;
}