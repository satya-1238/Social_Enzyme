const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


// tell passport use this strategy to google log in
passport.use(new googleStrategy({
    clientID:"xmkjfirw",
    clientSecret:"safasjflhwae cjssdbasd ",
    callbackURL:"afanknas"

    },
    function(accessToken,refreshToken,profile,done){
        // find the user
        User.findOne({
            email:profile.emails[0].value
        }).exec(function(err,user)
        {
            if(err)
            {
                console.log('error in google strategy-passport',err);
                return;
            }
            // console.log(profile);
            if(user)
            {
                // if founnd set this as req.user
                return done(null,user);
            }else{
                // if not found create the user and set is as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.email[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                    console.log('error in creating user google strategy-passport',err);
                return;
                    }
                    return done(null,user);
                })
            }
        })
    }

));
module.exports=passport;
