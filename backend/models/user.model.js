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
        enum:["male","female"],
    },
    bloodgroup:{
        type:String,
        require:true,
        default:"O+",
    },
    city:{
        type:String,
        require:true,
        default:""
    },
    phone:{
        type:String,
        require:true,
        unique:true,
        minlength:10,
        default:""
    },
    age:{
        type:Number,
        require:true,
        default:0
    },
    isdonor:{
        type:Boolean,
        require:true,
        default:false
    },
    address:{
        type:String,
        default:""
    }
},
{timestamps:true}
);

const User = mongoose.model("User",userSchema);

export default User;

