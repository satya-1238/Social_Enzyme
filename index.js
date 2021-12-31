const express=require('express');

const cookieParser=require('cookie-parser');// fire up the express   
const app=express();
const port=8000;

//required library
const expressLayouts=require('express-ejs-layouts');

// use db
const db=require('./config/mongoose');

// use this for session-coookies
const session =require('express-session');

// required library
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');


const MongoStore= require('connect-mongo') ;//(session);

// for Sass efficient css
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const flashMware=require('./config/middleware');
app.use(sassMiddleware({
      src:'./assets/scss',
      dest:'./assets/css',
      debug:true,
      outputStyle:'extended',
      prefix:'/css'
}));
// reading through post request
app.use(express.urlencoded());


// set up the cookie parser
app.use(cookieParser());



//set up the static files 
app.use(express.static('./assets'));
// available uplaods part available
app.use('/uploads',express.static(__dirname+'/uploads'));


// for using layouts
app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view Engine;
app.set('view engine','ejs');
app.set('views','./views');

// Mongo store is used to store the session cookie in the db
// setUp session
app.use(session({
    name: 'social_enzyme',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/social_enzyme_development',
        autoRemove:'disabled'
    },
    // new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
        
    //     },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMware.setFlash);
// Use Express Router
app.use('/',require('./routes')); //by access index.js inside routers

// Listen the Server
app.listen(port,function(err){
 if(err)
 {
     console.log('Error:',err);
     console.log(`Error in runnng the server:${err}`);
 }
 console.log(`server is running on port:${port}`);
});