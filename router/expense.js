import express from "express";
import { addexpense, editexpense, getexpenses } from "../controller/expense.js";



const router = express.Router();

// show expense:
router.get("/",async(request,response)=>{
    try {
        
        const result = await getexpenses(request)
        if(result.length<=0){
            return response.status(404).json({data:"no content available"})
        }
        return response.status(200).json({data:result})

    } catch (error) {
        console.log("error :",error)
        return response.status(500).json({data:"internal server error"})
    }
})

// add expense:

router.post("/add",async(request,response)=>{
    try {
        const newExpenseData = request.body;

        if(!newExpenseData){
            return response.status(400).json({data:"No content provided"})
        }
        const dates = new Date()
        newExpenseData.userId = request.user._id
        newExpenseData.day= dates.getDate();
        newExpenseData.month= dates.getMonth()+1;
        newExpenseData.year= dates.getFullYear();
        newExpenseData.date = dates;
        const result = await addexpense(newExpenseData)
        response.status(200).json({data:result})
    } catch (error) {
        console.log("error :",error)
        return response.status(500).json({data:"internal server error"})
        
    }
})

// edit expense:

router.put("/:id",async (request,response)=>{
    const {id} = request.params;
    try {
       const updateExpense = request.body;
       if(!updateExpense){
        return response.status(400).json({data:"No content provided"})
       }
       const result = await editexpense(id,updateExpense)
       return response.status(200).json({data:result})    
    } catch (error) {
        console.log("error :",error)
        return response.status(500).json({data:"internal server error"})
    }
})


export const expenserouter = router