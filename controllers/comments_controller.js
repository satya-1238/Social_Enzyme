const { redirect } = require('express/lib/response');
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create= async function(req,res){
    // find first postid
    try {
        let post=await Post.findById(req.body.post)
               if(post)
               {
                  let comment=await Comment.create({
                       content:req.body.content,
                       post:req.body.post,
                       user:req.user._id
                   });
                post.comments.push(comment);
                post.save(); //after update save in db
                req.flash('success', 'Comment added!');
                res.redirect('/');
               }
    
    } catch (error) {
        req.flash('error',err);
        return;
    }
}
               
                
            
module.exports.destroy=async function(req,res){
    
    try {
        let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id)
        {
            let postid=comment.post;
            comment.remove();
            let post=await Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}});
            req.flash('success','comment deleted');
            
        }
    else
    {
        req.flash('error', 'Unauthorized');
        return res.redirect('back');
    }
    
    } catch (err) {
        req.flash('error',err)
        return ;
    }
   
}