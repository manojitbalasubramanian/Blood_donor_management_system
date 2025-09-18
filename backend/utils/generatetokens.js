import jwt from "jsonwebtoken";

const generatetoken = (userId, res) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
    );
    res.cookie("jwt", token, {
        // No maxAge or expires: session cookie, expires when browser closes
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development",
        path: "/",
    });
    console.log("Session cookie set:", token);
};

export default generatetoken;