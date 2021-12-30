// module.exports.profile=function(req,res)
// {
//     res.end('<h1>User Profile</h1>');
// }

// Import the model 
const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res)
{
    User.findById(req.params.id,function(err,user){
         
    return res.render('user_profile',{
        title:"user Profile",
        profile_user:user
    })
    });
}
// Update the info your profile
module.exports.update =async function(req, res){
    
    if(req.user.id == req.params.id)
    {
        try {
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('multer Error',err)}
                // console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file)
                {
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        

                    }
                    // saving the path of the uploaded file into the avatarfield int the user
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
            
        } catch (error) {
            req.flash('error',error);
            return res.redirect('back');
        }
        
    }
    else{
         
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }

}
// render the sign up Page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"social_enzyme|Sign Up"
    })
}

// render the sign in Page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"social_enzyme|Sign In"
    })
}

// get the SignUp data
module.exports.create=function(req,res)
{
    // check password and confirm password are same
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }

    // check duplicacy of user-id
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('Error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user)
            {
                if(err)
                {
                    console.log('Error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');

            })
        }
        else{
            return res.redirect('back');
        }
    });
    
    

    
}

// Sign In and create the session for User
module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(); //provided by passport
    req.flash('success','Logged Out Successfully');
    return res.redirect('/');
}

