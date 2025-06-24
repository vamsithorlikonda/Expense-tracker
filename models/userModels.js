const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is mandatory feild"]
    },
    email:{
        type:String,
        required:[true,"Email is mandatory field"]
    },
    password:{
        type:String,
        required:[true,"Password is mandatory field"]
    }
})

module.exports=mongoose.model("user",userSchema);