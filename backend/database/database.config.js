import mongoose from "mongoose";

function db(){
    mongoose.connect(process.env.MONGODB_URI).
     then(()=>{
        console.log(`Server connected to MONGODB`)
    }).catch(error=>{
        console.log(error)
    })
}

export default db;