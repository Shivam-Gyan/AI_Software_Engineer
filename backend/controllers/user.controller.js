import * as userServices from "../database/user.services.js";
// import userModel from '../model/user.auth.js'
import { validationResult } from "express-validator";


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

    if (!errors.isEmpty) {
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