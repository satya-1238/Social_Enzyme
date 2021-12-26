const express=require('express');

const cookieParser=require('cookie-parser');
const app=express();
const port=8000;

const expressLayouts=require('express-ejs-layouts');
// use db
const db=require('./config/mongoose');

// reading through post request
app.use(express.urlencoded());


// set up the cookie parser
app.use(cookieParser());

//set up the static files 
app.use(express.static('./assets'));
// for using layouts
app.use(expressLayouts);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// Use Express Router
app.use('/',require('./routes')); //by access index.js inside routers

//set up the view Engine;
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
 if(err)
 {
     console.log('Error:',err);
     console.log(`Error in runnng the server:${err}`);
 }
 console.log(`server is running on port:${port}`);
});