

var login = require(_rootname+'/api/dao/login.js');

module.exports = function (req,res) {
    let reqArgu=req.body;
    //console.log(reqArgu);
    login.isEmail(reqArgu).then(function (data) {
        //console.log('/api/dao/login.js',data);
        if(data.rescode){
            res.json(data);            
        }
    });
};