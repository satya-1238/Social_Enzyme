const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // inlcude array of id's of comments for fetching comments with paricular post fast
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
        
    }]
},{
   timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;