var manage = require(_rootname + '/api/dao/manage.js');

module.exports = function (req, res) {

    let reqArgu = req.query;
    //console.log('reqArgu',reqArgu)
    reqArgu.userId =  req.session.member.id;
    manage.travelList(reqArgu).then(function (data) {
        //console.log('travelList>>>>',reqArgu,data);
        if (data.rescode) {
            res.json(data);
        }
    });
};