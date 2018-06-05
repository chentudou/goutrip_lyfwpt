var manage = require(_rootname+'/api/dao/manage.js');

module.exports = function (req,res) {
    let reqArgu=req.query;
    manage.selectCityInternal(reqArgu).then(function (data) {
        if(data.rescode){
            res.json(data);            
        }
    });
};