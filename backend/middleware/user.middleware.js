
import jwt from 'jsonwebtoken'
import redisClient from '../database/config/redis.config.js';



export const verifyUser = async(req, res, next) => {

    const client_header = req.headers.authorization;

    const client_token = client_header && client_header.split(' ')[1]
    
    if (!client_token) {
        return res.status(400).json({
            message: "User not Authorized",
            success: false
        })
    }

    // redis implementation if token already in logout state it return logout and user not authorized
    const isBlackList=await redisClient.get(client_token);
    if(isBlackList){
        return res.status(404).json({
            message:"User not Auhtorized",
            success:false
        })
    }

    const decoded = jwt.verify(client_token, process.env.JWT_SECRET)

    if (!decoded) {
        return res.status(400).json({
            message: "User not Authorized",
            success: false
        })
    }

    req.user = decoded;
    next();
}