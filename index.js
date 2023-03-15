import express from "express";
import cors from "cors";
import { incomerouter } from "./router/income.js";
import { expenserouter } from "./router/expense.js";
import { client } from "./db.js";



// middle wares

const app = express();
app.use(express.json());
app.use(cors());

// const dates = new Date();
// console.log(dates)
//    console.log(dates.getHours(),dates.getMinutes(),dates.getSeconds())

app.get("/",async(req,res)=>{
    const incomedata =  await client
    .db("moneyManager")
    .collection("income")
    .find()
    .toArray()

    const expensedata = await client
    .db("moneyManager")
    .collection("expense")
    .find()
    .toArray()


    res.status(200).json({incomedata:incomedata,expensedata:expensedata})
})

app.use("/income" , incomerouter);
app.use("/expense",expenserouter);

// app.listen(9000,()=>console.log("server started localhost:9000"))
app.listen(9000)
