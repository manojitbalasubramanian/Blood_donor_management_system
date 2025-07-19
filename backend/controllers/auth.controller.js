import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generatetokenandsetcookie from "../utils/generatetokens.js";


export const signup =async(req,res)=>{
    try {
        const {fullname,username,password,confrimpassword,gender,bloodgroup,city,phone,age,address} = req.body;

        // console.log(password)
        // console.log(confrimpassword)
        if(!fullname || !username || !password || !confrimpassword){
            return res.status(400).json({error:"please fill all the fields"})
        }

        if(password !== confrimpassword){
           return res.status(400).json({error:"password doesn't match"})
        }

        if(password.length < 6){  //condition to check the length of password
            return res.status(400).json({error:"password length must contain 6"})
        }

        const user = await User.findOne({username});//findone in to find the user in mongodb

        if(user){
            return res.status(400).json({error:"username already exist"})
        }

        // HASH PASS HERE
        const salt = await bcrypt.genSalt(10) //the value 10 denotes the time interval
        const hashedpassword = await bcrypt.hash(password,salt)

        const newuser = new User({
            fullname,
            username,
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

            generatetokenandsetcookie(newuser._id,res);

            await newuser.save();

            res.status(201).json({
                _id:newuser._id,
                fullname:newuser.fullname,
                username:newuser.username,
                password:newuser.password,
                confrimpassword:newuser.confrimpassword,
                bloodgroup:newuser.bloodgroup,
                city:newuser.city,
                phone:newuser.phone,
                age:newuser.age,
                address:newuser.address,
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
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const ispasswordcorrect = await bcrypt.compare(password,user?.password || ""); // "user?.password" is the user entered password , ? is to check if it is null
                                                                                        // OR "" in the above line is f
        if(!user){
            return res.status(400).json({error:"username not found please signup"});
        }
        if(!ispasswordcorrect){
            return res.status(400).json({error:"correct username but password is wrong"});

        }

        generatetokenandsetcookie(user._id,res);

        res.status(200).json({
                _id:user._id,
                fullname:user.fullname,
                username:user.username,
        });


    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({error:"internal server error"})
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