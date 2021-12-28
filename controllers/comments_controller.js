const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    // find first postid
    Post.findById(req.body.post,function(err,post){
               if(post)
               {
                   Comment.create({
                       content:req.body.content,
                       post:req.body.post,
                       user:req.user._id
                   },function(err,comment)
                   {
                        //  handle errors
                        post.comments.push(comment);
                        post.save(); //after update save in db
                        res.redirect('/');
                   });
               }
    });
}