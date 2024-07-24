import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 30
    },
    email: {
        type: String,
        required: [true, "please provide email "],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: String },
})

const user = mongoose.model("User", userSchema)
export default user;