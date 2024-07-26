import mongoose from "mongoose"

const todo_schema=new mongoose.Schema({
    txt:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","done","running"],
        required:true,
    }
},{timestamps:true})

export const todos = mongoose.model("todo",todo_schema)