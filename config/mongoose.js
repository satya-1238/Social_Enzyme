// library
const mongoose=require('mongoose');

// connect
mongoose.connect('mongodb://localhost/social_enzyme_development');

const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,"Error connected to mongodb"));

// if connected
db.once('open',function(){
    console.log('Connected to Database::MongoDB');
})

module.exports=db;