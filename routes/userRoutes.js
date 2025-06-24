const express=require('express')
const router=express.Router();
const {userRegister,userLogin, userCurrent}=require('../controllers/userControllers')
const verify=require('../middlewares/jwtVerification')
router.post("/register",userRegister)

router.post("/login",userLogin)

router.get("/current",verify,userCurrent)

module.exports=router;
