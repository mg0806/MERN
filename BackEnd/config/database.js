const mongoose = require("mongoose");

// const URI = process.env.DB_URI;
const connectDatabase =( )=>{
mongoose.connect(process.env.DB_URI).then((data)=>{
    console.log(`Mondodb Connected with server: ${data.connection.host}`);
})

};




module.exports = connectDatabase