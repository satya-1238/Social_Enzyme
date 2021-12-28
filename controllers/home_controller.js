
module.exports.home=function(req,res)
{

    // game  with cookies
    // console.log(req.cookies);
    // return res.end('<h1>Express set Up for social_enzymes </h1>');
    return res.render('home',{
        title:"Home"
    });
}
// module.exports.actionName=function(req,res)
// {

// }