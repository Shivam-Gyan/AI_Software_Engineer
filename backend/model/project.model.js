import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:[true,'Project name must be unique'],
        lowercase:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
})

export default mongoose.model('project',projectSchema)