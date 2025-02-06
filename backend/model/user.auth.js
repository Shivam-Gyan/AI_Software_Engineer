import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateJWT = async function () {
    return await jwt.sign({ email: this.email }, process.env.JWT_SECRET)
}

export default mongoose.model('user', UserSchema)