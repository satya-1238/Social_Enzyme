const mongoose=require('mongoose');
// importing multer
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars')
const userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        // required:true
    }
},{
    timestamps:true
});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {  //cb=callback fn
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now())   //field name here=avatar
    }
  });
// static fns
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;

//telling mongoose that its a model
const User=mongoose.model('User',userSchema);
module.exports=User;