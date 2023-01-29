import jwt from "jsonwebtoken";

export const verifyToken=async(req,res,next)=>{
    try{
        console.log("***************",req.headers.authorization);
        let token=req.headers.authorization.split(" ")[1];
        if(token){
            jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
                if(err){
                    res.status(403).json({msg:"access denied"})
                }else{
                    req.user=user;
                    next();
                }
            })
        }else{
            res.status(403).json({msg:"access denied"})
        }

    }catch(error){
        next(error);

    }
}




