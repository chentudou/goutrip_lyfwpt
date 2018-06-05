var previewDao = require(_rootname + '/api/dao/trip/preview.js');

module.exports = function (req, res) {

    let reqArgu = req.body;
    //console.log(' req.session.member', req.session.member)
    //console.log('explain>>>>',reqArgu);
    previewDao.explain(reqArgu).then(function (data) {
            //console.log('getDateList>>>>',reqArgu,data);
        if (data.rescode) {
            res.json(data);
        }
    });
};