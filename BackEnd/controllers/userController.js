const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Register a new user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is your avatar",
      url: "profilepicurl",
    },
  });

  sendToken(user,201,res);
 
});

//Login a user
exports.loginUser = catchAsyncError(async (req, res,next) => {
    const {email, password } = req.body;

    //Check if the user has given both email and password

    if (!email ||!password) {
      return next(new ErrorHandler("Please provide email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password",401));
    }
    const isPasswordMatched = user.comparePassword(password,user.password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password",401));
    }

    
  sendToken(user,200,res);

});

//Logout a user
exports.logoutUser = catchAsyncError(async (req,res,next) => {
res.cookie("token",null,{
  expires: new Date(Date.now()),
  httpOnly: true
})

res.status(200).json({
  success: true,
  message: " logged out"
})
});
