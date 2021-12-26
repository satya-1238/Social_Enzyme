// module.exports.profile=function(req,res)
// {
//     res.end('<h1>User Profile</h1>');
// }
module.exports.profile=function(req,res)
{
    // return res.end('<h1>Express set Up for social_enzymes </h1>');
    return res.render('profile',{
        title:"user Profile"
    });
}