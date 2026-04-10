import mongoose from 'mongoose';
const connect_DB = async ()=>{
    try {

        await mongoose.connect(process.env.DB_URI);
        console.log("DATABASE CONNECT SUCCESFILLY");
        await mongoose.connect(process.env.DB_URI,{
            serverSelectionTimeoutMS:1000,
        });
    } catch (error) {
        console.log("Error Connection DB",error);
        
    }
}

export default connect_DB;