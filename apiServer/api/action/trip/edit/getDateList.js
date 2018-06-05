var editDao = require(_rootname + '/api/dao/trip/edit');

module.exports = function (req, res) {

    let reqArgu = req.body
    //console.log(' req.session.member', req.session.member)
    reqArgu.userId =  req.session.member.id;
    reqArgu.travelId=req.body.travelId
    //console.log('travelId>>>>',reqArgu);
    editDao.getDateList(reqArgu).then(function (data) {
            //console.log('getDateList>>>>',reqArgu,data);
        if (data.rescode) {
            res.json(data);
        }
    });
};
