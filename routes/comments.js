const express = require('express');
const router = express.Router();
const passport=require('passport');

// Importing the post_controller
const commentsController=require('../controllers/comments_controller');
router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports=router;