// Update own user profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const allowedFields = [
            "fullname", "username", "email", "gender", "bloodgroup", "city", "phone", "age", "address"
        ];
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        }
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to update profile" });
    }
};
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generatetokenandsetcookie from "../utils/generatetokens.js";
import jwt from "jsonwebtoken";


export const signup =async(req,res)=>{
    try {
        const {fullname,username,email,password,confrimpassword,gender,bloodgroup,city,phone,age,address} = req.body;

        // console.log(password)
        // console.log(confrimpassword)
        if(!fullname || !username || !email || !password || !confrimpassword){
            return res.status(400).json({error:"please fill all the fields"})
        }

        if(password !== confrimpassword){
           return res.status(400).json({error:"password doesn't match"})
        }

        if(password.length < 6){  //condition to check the length of password
            return res.status(400).json({error:"password length must contain 6"})
        }

        const user = await User.findOne({$or: [{username}, {email}]});
        if(user){
            if(user.username === username) {
                return res.status(400).json({error:"username already exist"})
            }
            if(user.email === email) {
                return res.status(400).json({error:"email already exist"})
            }
        }

        // HASH PASS HERE
        const salt = await bcrypt.genSalt(10) //the value 10 denotes the time interval
        const hashedpassword = await bcrypt.hash(password,salt)

        const newuser = new User({
            fullname,
            username,
            email,
            password:hashedpassword,
            confrimpassword:hashedpassword,
            gender,
            bloodgroup,
            city,
            phone,
            age,
            address
        })

        if(newuser){
            await newuser.save();

            // Generate token for the new user
            const token = jwt.sign(
                { userId: newuser._id },
                process.env.JWT_SECRET,
                { expiresIn: "15d" }
            );

            res.status(201).json({
                _id: newuser._id,
                fullname: newuser.fullname,
                username: newuser.username,
                email: newuser.email,
                bloodgroup: newuser.bloodgroup,
                city: newuser.city,
                admin: newuser.admin,
                token: token
            })
        }
        else{
            res.status(400).json({error:"invalid user data"})
        }

    } catch (error) {
        console.log("error in signup controller", error.message)
        res.status(500).json({error:"internal server error"})
    }
};

export const login =async(req,res)=>{
    try {
        const { identifier, password } = req.body;
        // Find user by username or email
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        });
        const ispasswordcorrect = await bcrypt.compare(password, user?.password || "");
        if (!user) {
            return res.status(400).json({ error: "User not found. Please signup." });
        }
        if (!ispasswordcorrect) {
            return res.status(400).json({ error: "Correct identifier but password is wrong" });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15d" }
        );

        // Send the response with user data and token
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            bloodgroup: user.bloodgroup,
            city: user.city,
            admin: user.admin,
            token: token,
            message: "Login successful"
        });
    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({ error: "internal server error" })
    }
};

export const logout =(req,res)=>{
    try {//want to clear the cookie to logout

        res.cookie("jwt","",{maxAge:0});//token is empty & {maxAge} is 0

        res.status(200).json({message:"logged out successfully"});

    } catch (error) {

        console.log("error in logout controller", error.message)
        res.status(500).json({error:"internal server error"})
    }
};