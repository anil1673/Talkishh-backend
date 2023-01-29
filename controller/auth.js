import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


  const registerController=async(req,res,next)=>{
    try{
       const {firstName,lastName,email,password,friends,location,occupation} =req.body;
       const picturePath=req.file.filename;
    

       const hashPass=await bcryptjs.hash(password,10);
       const newUser=new User({
        firstName,lastName,email,password:hashPass,picturePath,friends,location,occupation,
        viewedProfile:Math.floor(Math.random() * 10000),impressions:Math.floor(Math.random() * 10000)
       });
       await newUser.save().then((user)=>{
            res.status(201).json(user)
       }).catch((error)=>{
            res.status(500).send({error:error.message})
       })


    }catch(error){
        next(error)
    }
}



// login
const loginController=async(req,res,next)=>{
    try{
        const findUser=await User.findOne({email:req.body.email}).then(async(user)=>{
            await bcryptjs.compare(req.body.password,user.password,(err,result)=>{
                if(!result){
                    res.status(400).json({msg:"Password is wrong",type:2})
                }else{
                    jwt.sign({id:user._id},process.env.SECRET_KEY,(err,token)=>{
                        if(err){
                            res.status(401).json({error:err.message,msg:"token gen error"})
                        }else{
                            res.status(200).json({
                                token,user
                            })
                        }
                    })
                }
           });

        }).catch((error)=>{
            res.status(400).json({error:error.message,msg:"User doesnot exist",type:1})
        })
        
        
        
    }catch(err){
        next(err);
    }

}


export {registerController,loginController}


