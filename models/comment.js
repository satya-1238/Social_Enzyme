const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema(
    {
        content:{
            type:String,
            required:true

            },
            // comment belong to User
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        // commet belong to post
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    },
    {
        timestamps:true
    }
);

const comment=mongoose.model('comment',commentSchema);
module.exports=comment;