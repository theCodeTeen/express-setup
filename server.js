import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

//ADDING .env TO process.env
dotenv.config();


//Connecting to our mongodb 
let uri = process.env.DB_URI || "";
uri = uri.replace("<password>",process.env.DB_PASS);
mongoose.connect(uri,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.log(err));


//Starting server on given port
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,()=>{
    console.log("Server listening on port 3000...");
})


//Handling unhandledRejections
process.on('unhandledRejection',(err=>{
    console.log("UNHANDLEDREJECTION! shutting down.....");
    console.log(err.name,err.message);

    server.close(()=>{
        console.log("Server closed....");
        process.exit(1);
    })
}));

process.on("SIGTERM",(err)=>{
    console.log("SIGTERM! shutting down......");

    server.close(()=>{
        console.log("Server closed....");
    })
})