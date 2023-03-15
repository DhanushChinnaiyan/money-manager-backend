import express from "express";
import cors from "cors";
import { incomerouter } from "./router/income.js";
import { expenserouter } from "./router/expense.js";



// middle wares

const app = express();
app.use(express.json());
app.use(cors());


app.use("/income" , incomerouter);
app.use("/expense",expenserouter);

// app.listen(9000,()=>console.log("server started localhost:9000"))
app.listen(9000)
