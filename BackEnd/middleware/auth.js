const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    // console.log("isAuthenticatedUser: req.user:", req.user);
    const {token} = req.cookies;
    
    if(!token) {
        return next(new ErrorHandler("Please login to access this resource.",401));
    }
    
    const decodedData = jwt.verify(token,process.env.JWT_SECRET,async(decodedData)=>{
    req.user = await User.findById(decodedData._id);

    });
    next();
});  


//not working as role is undefined problem arises.
exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {
        const bearerHeaders = req.headers['authorization'];
        console.log(bearerHeaders);
        const bearerToken = bearerHeaders.split(' ')[1];
        console.log(bearerToken);
        req.token = bearerToken;
        console.log(process.env.JWT_SECRET);
        jwt.verify(req.token,process.env.JWT_SECRET,async(error, response)=>{

            console.log("hello",response,"bamboo",error);
            console.log("hello",response._id);
            
            const user = await User.findById(response._id);

            console.log("panda",user);
            console.log("panda",user.role);

            if (!roles.includes(user.role)) {
                return next(new ErrorHandler(`Role: ${user.role} is restricted from accessing this resource`, 403));
            }
        });




        // console.log(req.headers);
        // console.log("hello ",bearerHeaders);
        // console.log(req.rawHeaders[13].split('token=')[1]);+
        // const decodedData = jwt.verify(req.rawHeaders[13].split('token=')[1],process.env.JWT_SECRET,async(decodedData)=>{
        //     req.user = await User.findById(decodedData._id);
        
        //     });
        // console.log(decodedData);
        // console.log("req.user:", req.body.user);
        // if (!roles.includes(req.user.role)) {
        //     return next(new ErrorHandler(`Role: ${req.user.role} is restricted from accessing this resource`, 403));
        // }

        
        
        
        
        next();
    };
};

