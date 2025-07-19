import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    gender:{
        type:String,
        require:true,
    },
    bloodgroup:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        require:true,
    },
    address:{
        type:String,
    }
},
{timestamps:true}
);

const User = mongoose.model("User",userSchema);

export default User;

