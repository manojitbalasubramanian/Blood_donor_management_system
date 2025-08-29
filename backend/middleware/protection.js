import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protection = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "No token provided. Please login first" });
        }

        const token = authHeader.split(' ')[1]; // Bearer TOKEN
        
        if (!token) {
            return res.status(401).json({ error: "Invalid token format. Please login again" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token verified successfully:", decoded); // Add this for debugging
        } catch (error) {
            console.log("Token verification failed:", error.message);
            return res.status(401).json({ error: "Invalid token - please login again" });
        }
        
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ error: "Invalid token payload - please login again" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({error:"user not found"});
        }

        req.user =user;
        next();

    } catch (error) {
        console.log("error in protectRoute middleware :",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export default protection;