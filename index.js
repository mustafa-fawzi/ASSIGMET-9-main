import express from 'express'
import dotenv from 'dotenv'
dotenv.config({path:"./config/dev.env"});


import bootstrap from "./app.controller.js";

const app = express();
const port = process.env.PORT||5000;
bootstrap(app,express);
app.listen(port,()=>{
    console.log(`Ruuning Server in Port = ${port}`);
})

