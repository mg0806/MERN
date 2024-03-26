const { log } = require("console");
const app = require("./App");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const { Server } = require("http");


//Uncaught exceptions Handling

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
})
//config

dotenv.config({path:"Backend/config/config.env"});

//connecting to database

connectDatabase();

app.listen(process.env.Port,()=>{

    console.log(`Server is workig on http://localhost:${process.env.Port}`)
})


//Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandeled rejection`);

    server.close(()=>{
        process.exit(1);
    })
});