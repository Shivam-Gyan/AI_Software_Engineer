import * as userServices from "../database/services/user.services.js";
import userModel from '../model/user.auth.js'
import { validationResult } from "express-validator";
import redisClient from "../database/config/redis.config.js";

export const createUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: errors.array()[0].msg,
            success: false
        })
    }

    try {
        const user = await userServices.createUserService(req.body);

        const token = await user.generateJWT();

        return res.status(200).json({
            success: true,
            message: "User signup successfully",
            name:user.name,
            email:user.email,
            token
        })

    } catch (error) {
        if (error.code == 11000) {
            console.log("user already exist")
            return res.status(500).json({
                message: `user already exist ${error.code} duplicate entry`,
                success: false
            });
        }
        else {
            console.log(error.message)
            return res.status(500).json({
                message: error.message,
                success: false
            });

        }
    }

}


export const loginUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: "errors",
            success: false
        })
    }
    try {
        const user=await userServices.loginUserServices(req.body)

        const {password}=req.body

        if(!user){
            return res.status(400).json({
                message: "Invalid Credential",
                success: false
            });
        }
        
        if(!await user.isValidPassword(password)){
            return res.status(400).json({
                message: "Invalid Credential",
                success: false
            });
        }

        const token = await user.generateJWT();

        return res.status(200).json({
            success: true,
            message: "User signin successfully",
            name:user.name,
            email:user.email,
            token
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const checkProfile=async (req,res)=>{
    const decoded=req.user

    try {
        const user=await userServices.userProfileService(decoded.email);

        return res.status(201).json({
            message:"success fully fetched",
            success:true,
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export const logoutUser=async(req,res)=>{

    const token=req.cookies.token || req.headers.authorization.split(' ')[1];

    redisClient.set(token,'logout','EX',60*60*24)

    return res.status(200).json({
        message:"user Logout ",
        success:true
    })
}

export const getAllUsers=async(req,res)=>{

    try{
        const userId=await userModel.findOne({email:req.user.email}).select("_id")
        const users=await userServices.getAllUsers({userId});
        if(!users){
            return res.status(404).json({
                error:"users not found",
                message:"Failed to get users"
            })
        }

        return res.status(200).json({
            messgae:"User fetched successfully",
            users
        })

    }catch(error){
        return res.status(500).json({
            error:"Failed to get all users",
            message:error.message
        })
    }
}