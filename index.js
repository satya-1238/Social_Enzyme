const express=require('express');
const app=express();
const port=8000;

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