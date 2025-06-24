const Expense=require('../models/expenseModels')
//create new expense
//private only for login user
const createExpense=async(req,res)=>{
    const{date,amount,reason}=req.body
    if(!date||!amount||!reason){
        throw new Error("date,amount,reason are mandatory")
    }
    const expense=await Expense.create({
        date,
        amount,
        reason,
        user:req.user.id
    })
    res.status(202).json({
        message:"Successfully expense created",
        date:expense.date,
        amount:expense.amount
    })
}

//create view past expenses
//private only for login user
const viewExpense=async(req,res)=>{
    const userId=req.user.id
    const expense=await Expense.find({user:userId})
    if(expense){
        res.json({expense})
    }
    else{
        throw new Error("Some thing went wrong")
    }
}

//create update past expense
//private only for login user
const updateExpense=async(req,res)=>{
    const expense= await Expense.findById(req.params.id)
    if(!expense){
        res.status(401).json({message:"Cannot find Id"})
    }
    if(expense.user.toString()!==req.user.id){
        res.status(401).json({message:"You don't have permission to update"})
    }
    const updatedexpense=await Expense.findByIdAndUpdate(req.params.id,req.body,{new:true}
    )
    res.json({updatedexpense})
}

//create delete past expense
//private only for login user
const deleteExpense=async(req,res)=>{
    const expense=await Expense.findById(req.params.id)
    if(!expense){
        res.status(402).json({message:"Cannot find id"})
    }
    if(expense.user.toString()!==req.user.id){
        res.status(402).json({message:"You don't have any permission"})
    }
    const deleteexpense=await Expense.findByIdAndDelete(req.params.id)
    res.json({message:`Successfully deleted the${deleteexpense}`})
}

module.exports={createExpense,updateExpense,viewExpense,deleteExpense}