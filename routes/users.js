const express=require('express');
const router=express.Router();
console.log("User File");
const usersController=require('../controllers/users_controller');


router.get('./profile',usersController.profile);
module.exports=router;