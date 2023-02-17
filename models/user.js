import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        require:true,
        min:8
    },
    picturePath:{
        type:String,
        required:true,
        
    },
    friends:{
        type:Array,
        default:[]

    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    suggestions:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number,


},{timestamps:true});

const User=new mongoose.model("User",userSchema);


export default  User