var login = require(_rootname+'/api/dao/login.js');
module.exports = function (req,res) {
    let reqArgu=req.body;
    //console.log(reqArgu);
    login.register(reqArgu).then(function (data) {
        if(data.rescode){
            res.json(data);            
        }
    });
};