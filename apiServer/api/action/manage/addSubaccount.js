var manage = require(_rootname + '/api/dao/manage.js');

module.exports = function (req, res) {

    let reqArgu = {
        userId: req.session.member ? req.session.member.id : req.session.member.userId,
        name:req.body.name,
        password:req.body.password
    };
    //console.log(reqArgu);
    manage.addSubaccount(reqArgu).then(function (data) {
        if (data.rescode) {
            res.json(data);
        }
    });
};