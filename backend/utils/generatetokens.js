import jwt from "jsonwebtoken";

const generatetoken =(userId,res)=>{
    const token =jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn:"15d"}
    )
    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, // 15 days
        httpOnly: true,
        sameSite: "lax", // Changed from strict to lax to allow cross-site requests
        secure: process.env.NODE_ENV !== "development",
        path: "/",  // Ensure cookie is available for all paths
    });
    
    console.log("Cookie set:", token);
};

export default generatetoken;