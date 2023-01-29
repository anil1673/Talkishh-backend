import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv"
import "./db/conn.js"
import { authRouter } from "./router/auth.js";
import userRouter from "./router/user.js";
import postRouter from "./router/post.js";
import User from "./models/user.js";
import Post from "./models/post.js";
import {users,posts} from "./data/index.js"


// This URL.fileURLToPath function decodes the file URL to a path string and ensures that the URL control characters (/, %) are correctly appende
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config();
const app=express();


app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
// app.use("/public/assets",express.static("/public/assets"))
app.use("/public/assets",express.static(path.join(__dirname,"public/assets")));




// file storage

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});

const upload=multer({storage});


// router setup
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/post",postRouter);



app.use((err,req,res,next)=>{
    const errorStatus=err.status||500;
    const errorMessage=err.message|| "something went wrong";


    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })

})



app.listen(5000,(req,res)=>{
    console.log("express connection success")
})



export {upload}
