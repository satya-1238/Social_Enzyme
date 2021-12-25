// const { Router } = require('express');
const express=require('express');
const router=express.Router();



const homeController=require('../controllers/home_controller');
console.log("Router Loaded");



router.get('/',homeController.home);
router.use('/users',require('./users'));

// for any further routes ,access from here
// router.use('/routerName,require('./routerFile));


module.exports=router;