import dotenv from "dotenv";
dotenv.config({path:'./config.env'});
import mongoose from "mongoose";

const DB=process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("mongoose connectionn successfull");
}).catch((err)=>{
    console.log("mongoose connection problem", err);
})
