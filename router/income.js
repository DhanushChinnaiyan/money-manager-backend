import express from "express";
import jwt from "jsonwebtoken";
import { addincome, editIncome, getIncomes } from "../controller/income.js";


const router = express.Router();

// show income:
router.get("/",async(request,response)=>{
    try {
        
        const result = await getIncomes(request)
        if(result.length<=0){
            return response.status(404).json({data:"no content available"})
        }
        
        return response.status(200).json({data:result})

    } catch (error) {
        console.log("error :",error)
        return response.status(500).json({data:"internal server error"})
    }
})

// add income:

router.post("/add",async(request,response)=>{
    try {
        const newIncomeData = request.body;
        if(!newIncomeData){
            return response.status(400).json({data:"No content provided"})
        }
        
        const dates = new Date();
        newIncomeData.day= dates.getDate();
        newIncomeData.month= dates.getMonth()+1;
        newIncomeData.year= dates.getFullYear();
        newIncomeData.date = dates;
       
        const result = await addincome(newIncomeData)
        
        response.status(200).json({data:result})
    } catch (error) {
        console.log("error :",error)
        return response.status(500).json({data:"internal server error"})
        
    }
})


// edit income:

router.put("/:id",async (request,response)=>{
    const {id} = request.params;
    try {
       const updateIncome = request.body;
       if(!updateIncome){
        return response.status(400).json({data:"No content provided"})
       }
       const result = await editIncome(id,updateIncome)
       return response.status(200).json({data:result})    
    } catch (error) {
        console.log("error :",error)
        return response.status(500).json({data:"internal server error"})
    }
})








export const incomerouter = router
