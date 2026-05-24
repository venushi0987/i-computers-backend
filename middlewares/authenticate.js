import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export default function authenticateUser(req, res, next){ //empty middleware function to test if the server is working
    const header = req.headers["authorization"];

    if(header != null) {
        const token = header.replace("Bearer ", ""); //remove "Bearer " from the token string

    jwt.verify(token, JWT_SECRET,
        (err, decoded) => { //decrypt the token using the same secret key used to create it
            if(decoded == null) {
                res.status(401).json({ message: "Invalid token" });
            }else {
                req.user = decoded;
                next();
            }
        });
    }else {
        next();
    }
}