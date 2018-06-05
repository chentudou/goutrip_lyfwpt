var login = require(_rootname+'/api/dao/login.js');
module.exports = function (req,res) {
    params=req.body;
    console.log("1111111111112222222222",params)
    if(params.logout){
        req.session.member="";
        res.json({
            rescode:'200',
            msg:"session已清除"
        })
    }else{
        var data=req.session.member;
        res.json(data); 
    }               
};