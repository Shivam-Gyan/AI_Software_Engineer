import mongoose from 'mongoose';



const fileTreeSchema = new mongoose.Schema({

    fileTree:{
        type:Object,
        default:{}
    },
    savedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

},{timestamps:true})

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
    }],
    createdByUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    fileTreeSaved:[fileTreeSchema]
})

export default mongoose.model('project',projectSchema)