const express=require('express');
const app=express();
const port=8000;

// Use Express Router
app.use('/',require('./routes')); //by access index.js inside routers

app.listen(port,function(err){
 if(err)
 {
     console.log('Error:',err);
     console.log(`Error in runnng the server:${err}`);
 }
 console.log(`server is running on port:${port}`);
});