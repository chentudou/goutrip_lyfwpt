var manage = require(_rootname + '/api/dao/manage.js');

module.exports = function (req, res) {
    let reqArgu = {
        userId: req.session.member ? req.session.member.id : req.session.member.userId
    };
    //console.log(req.session.member.userId, req.session.member);
    manage.subaccount(reqArgu).then(function (data) {
        if (data.rescode) {
            res.json(data);
        }
    });
};