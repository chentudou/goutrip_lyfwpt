var manage = require(_rootname + '/api/dao/manage.js');

module.exports = function (req, res) {
    let reqArgu = req.body;
    console.log("reqArgu",reqArgu);
    res.render('preview',reqArgu);
    /* let reqArgu = req.body;
    reqArgu.userId = req.session.member ? req.session.member.id : req.session.member.userId;
    manage.update(reqArgu).then(function (data) {
        //console.log('修改信息》》》', data)
        if (data.rescode) {
            res.json(data);
        }
    }); */
};