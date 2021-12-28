// module.exports.profile=function(req,res)
// {
//     res.end('<h1>User Profile</h1>');
// }

// Import the model
const User=require('../models/user');
module.exports.profile=function(req,res)
{
    // return res.end('<h1>Express set Up for social_enzymes </h1>');
    return res.render('user_profile',{
        title:"user Profile"
    });
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
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(); //provided by passport
    return res.redirect('/');
}

