const express=require('express');
const userrouter = require('./routes/userRoutes');
const expenserouter=require('./routes/expenseRoutes')
const dotenv=require('dotenv').config()
const dbConnect=require('./connections/dbConnection')
app=express();

port=process.env.PORT
app.use(express.json())

app.use("/api",userrouter)
app.use("/api",expenserouter)

app.post("/api",(req,res)=>{
    res.json({message:"Expense tracker"})
})
dbConnect();

app.listen(port,()=>{
    console.log('Server running...')
})