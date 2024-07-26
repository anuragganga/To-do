import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js" 
import {todos} from  "../models/todo.model.js"

const add_todo=asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {txt ,status}=req.body;

    if(!(txt&& status)){
        throw new apiError(400,"All fields required")
    }

    try{
        const new_entry=new todos({
            txt:txt,
            status:"pending"
        })
    
        const resp=await new_entry.save();
    
        res.status(200).json(new apiResponse(200,resp,"new entry created"))
    }catch(error){
        throw new apiError(400,`Error:${error.message}`)
    }
})

const edit_todo=asyncHandler(async(req,res)=>{
    const {_id,txt ,status}=req.body;

    if(!(txt&& status && _id)){
        throw new apiError(400,"All fields required")
    }

    try{
        const resp=await findByIdAndUpdate(_id,{
            txt:txt,
            status:status
        })
    
        res.status(200).json(new apiResponse(200,resp,"entry updated "))
    }catch(error){
        throw new apiError(400,`Error:${error.message}`)
    }
})
const delete_todo = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    if (!_id) {
        throw new apiError(400, "ID is required");
    }

    try {
        const resp = await findByIdAndDelete(_id);

        if (!resp) {
            throw new apiError(404, "Todo not found");
        }

        res.status(200).json(new apiResponse(200, resp, "Todo deleted"));
    } catch (error) {
        throw new apiError(400, `Error: ${error.message}`);
    }
});
const get_todo = asyncHandler(async (req, res) => {
    try {
        
        const todos = await todos.find();
        
        
        res.status(200).json(new apiResponse(200, todos, "Todos retrieved successfully"));
    } catch (error) {
        
        throw new apiError(400, `Error: ${error.message}`);
    }
});

export {
    add_todo,edit_todo,delete_todo,get_todo
}