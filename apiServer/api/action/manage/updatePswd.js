var manage = require(_rootname + '/api/dao/manage.js');

module.exports = function (req, res) {

    let reqArgu ={
        userId:req.session.member ? req.session.member.id : req.session.member.userId,
        oldPassword:req.body.oldPassword,
        password:req.body.password,
    } 
    //console.log('22222222', reqArgu)
    manage.updatePswd(reqArgu).then(function (data) {
        //console.log('修改原密码', data)
        if (data.rescode) {
            res.json(data);
        }
    });
};