import userModel from "../model/user.auth.js";


export const createUserService=async({name,email,password})=>{

    if(!email||!name||!password){
        throw new Error("Fill the entire form")
    }

    const hashedPassword=await userModel.hashPassword(password);

    const user=await userModel.create({
        name,
        email,
        password:hashedPassword
    })
    
    return user;
}

export const loginUserServices=async({email,password})=>{
    if(!email||!password){
        throw new Error('Fill entire form')
    }
    const user=await userModel.findOne({email}).select("+password")
    return user;
   
   
}

export const userProfileService=async(email)=>{
    if(!email){
        throw new Error("user not Authorized");
    }
    
    const user=await userModel.findOne({email})
    
    if(!user){
        throw new Error("user not Authorized");
    }

    return user;
}