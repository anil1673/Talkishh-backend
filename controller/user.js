
import User from "../models/user.js";

// read
// get user
 export const getUser=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id).then((user)=>{
            res.status(200).json(user);
        }).catch((error)=>{
            res.status(401).json({
                msg:error.message
            })
        })
        
    }catch(error){
        next(error)
    }
 }


// get user friends
export const getUserFriends=async(req,res,next)=>{
    try{
        const {id}=req.params;
        
        const user=await User.findById(id).then(async(user)=>{
            await Promise.all(user.friends.map((id)=>User.findById(id))).then((friends)=>{
                const formattedFriends=friends.map(({_id,firstname,lastname,occupation,picturePath,location})=>{return {_id,firstname,lastname,occupation,picturePath,location}});

                res.status(200).json(formattedFriends);
            })
            res.status(200).json(user);
        }).catch((error)=>{
            res.status(401).json({
                msg:error.message
            })
        })
        
    }catch(error){
        next(error)
    }
 }



export const fetchAllUser=async(req,res,next)=>{
    try{
        const alluser=await User.find();
        res.status(200).json(alluser);
    }catch(error){
        next(error)
    }
}
// // update user friends
export const addRemoveFriend=async(req,res,next)=>{
    try{
        const {id,friendId}=req.params;
        await User.findById(id).then(async(user)=>{
            const friend=await User.findById(friendId);
            if(user.friends.includes(friendId)){
                user.friends=user.friends.filter((id)=>id !== friendId);
                friend.friends=friend.friends.filter((id)=>id !== friendId);

            }else{
                user.friends.push(friendId);
                friend.friends.push(friendId);
            }
            await user.save();
            await friend.save();
            await Promise.all(user.friends.map((id)=>User.findById(id))).then((friends)=>{
                const formattedFriends=friends.map(({_id,firstname,lastname,occupation,picturePath,location})=>{return {_id,firstname,lastname,occupation,picturePath,location}});

                res.status(200).json(formattedFriends);
            })
        }).catch((error)=>{
            res.status(404).json({error:error.message,msg:"user not found"})
        })

    }catch(error){
        next(error)
    }
}