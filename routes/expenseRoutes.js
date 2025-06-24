const express=require('express');
const {createExpense,updateExpense,viewExpense,deleteExpense}=require('../controllers/expenseControllers')
const verify=require('../middlewares/jwtVerification')
const router=express.Router();

router.post("/expense/add",verify,createExpense)

router.get("/expense/view",verify,viewExpense)

router.put("/expense/:id",verify,updateExpense)

router.delete("/expense/:id",verify,deleteExpense)

module.exports=router;