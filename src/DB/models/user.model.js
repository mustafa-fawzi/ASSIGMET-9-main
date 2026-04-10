import mongoose from "mongoose";
const {Schema} = mongoose;
const usersechema = new Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        min:[18,"Small Age"],
        max:[60,"Good age"],
    },




} , {timestamps:true});

const usermodel = mongoose.model("user",usersechema);
export default usermodel;

