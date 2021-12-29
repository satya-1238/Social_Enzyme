const { redirect } = require('express/lib/response');
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
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment)
    {
        if(comment.user==req.user.id)
        {
            let postid=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},function(err,post)
            {
            return res.redirect('back');
            
        })
    }
    else
    {
        return res.redirect('back');
    }
    });
}