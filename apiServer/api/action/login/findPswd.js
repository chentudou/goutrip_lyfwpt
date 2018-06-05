var login = require(_rootname+'/api/dao/login.js');
module.exports = function (req,res) {
    let reqArgu=req.body;
    login.login(reqArgu).then(function (data) {
        if(data.rescode){
            res.json(data);            
        }
    });
};