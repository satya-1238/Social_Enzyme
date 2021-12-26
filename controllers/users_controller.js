// module.exports.profile=function(req,res)
// {
//     res.end('<h1>User Profile</h1>');
// }

// Import the model
const User=require('../models/User');
module.exports.profile=function(req,res)
{
    if(req.cookies.user_id){
     User.findById(req.cookies.user_id,function(err,user){
         if(user)
         return res.render('user_profile',{
             title:"user Profile",
             user:user,
         })
         else
         {
             return res.redirect('/users/sign-in');
         }
     })
    }
    else
    {
        return  res.redirect('/users/sign-in')
    }
    // return res.end('<h1>Express set Up for social_enzymes </h1>');
    // return res.render('user_profile',{
    //     title:"user Profile"
    // })
}

// render the sign up Page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"social_enzyme|Sign Up"
    })
}

// render the sign in Page
module.exports.signIn=function(req,res){
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
    // find the User
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('Error in finding user in signing In');
            return;
        }
         //if user found then handle
         if(user){
                           //  if password doesn't match
                           if(user.password!=req.body.password){
                               console.log("Password not match");
                               return res.redirect('back');
                           }
                                  // if password match then create session
                            res.cookie('user_id',user.id);
                            console.log("Profile after sign In");
                            return res.redirect('/users/profile');

         }
         else  // if userNotFound handle
         {
            //  console.log("User doesn't exist");
             return res.redirect('back');

         }
        
    });   
}