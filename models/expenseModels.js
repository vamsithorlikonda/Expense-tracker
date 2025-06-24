const mongoose=require('mongoose')
const { type } = require('os')

const expenseSchema=mongoose.Schema({
    user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
    },
    date:{
        type:Date,
        required:[true,"Date is mandatory"]
    },
    amount:{
        type:Number,
        required:[true,"Amount"]
    },
    reason:{
        type:String,
        required:[true,"Reason for spent"]
    }
})

module.exports=mongoose.model("expense",expenseSchema);