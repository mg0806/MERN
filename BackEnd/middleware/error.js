const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
console.error(err.message);

    // MongoDB Error

    if (err.name === "CastError"){
        const message = `resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        sucess:false,
        error:err.stack,
        message:err.message
    });
};