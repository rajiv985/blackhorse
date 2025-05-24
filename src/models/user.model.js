import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    fullname: String,
    phonenumber:Number,
    email: String,
    password: String,
    otp: String,
    otpExpires: Date,
    isVerified: { type: Boolean, default: false }

});
const User = mongoose.model('User', userSchema)
export default User;  
