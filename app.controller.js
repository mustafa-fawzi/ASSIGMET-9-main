import connect_DB from "./src/DB/connection.js";
import { authrouter } from "./src/modules/index.js";
import { noterouter } from "./src/modules/index.js";


const bootstrap = async (app,express)=>{
    app.use(express.json());
    await connect_DB();
app.use("/auth",authrouter)
app.use("/notes",noterouter)



app.get("/",(req,res)=>{
    return res.status(200).json({message:"Hello Mongoose"});
})

    app.all("/*dummy",(req,res)=>{
        return res.status(400).json({message:"Not Found Handelere!!!!"});
    })
}


export default bootstrap;