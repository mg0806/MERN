const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    role:{
        type: String,
        default:"user",
},
    name: {
        type: String,
        required:[true,"Please enter your Name"],
        
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [30, "Name cannot be more than 30 characters long"],
    },
    email:{
        type: String,
        required:[true,"Please enter your Email"],
        unique: true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type: String,
        required:[true,"Please enter your password"],
        minlength: [8, "Password must be at least 6 characters long"],
        select:false,
        maxlength: [30, "Password cannot be more than 30 characters long"],
    },
    avatar: {
        
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        
    

    },
    

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT Token

userSchema.methods.getJWTToken = function () {
    console.log(process.env.JWT_SECRET);
    return jwt.sign({_id:this._id},process.env.JWT_SECRET, {
        // expiresIn: process.env.JWT_EXPIRE,
    })
}

//Compare Password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

//Export the model
module.exports = mongoose.model("User",userSchema)