import jwt from 'jsonwebtoken';

export default function authenticateUser(req, res, next){ //empty middleware function to test if the server is working
    const header = req.headers["authorization"];

    if(header != null) {
        const token = header.replace("Bearer ", ""); //remove "Bearer " from the token string

    jwt.verify(token, "com99#12@", 
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