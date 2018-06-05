var editDao = require(_rootname + '/api/dao/trip/edit');

module.exports = function (req, res) {
    let reqArgu = req.body;
    reqArgu.userId = req.session.member ? req.session.member.id : req.session.member.userId;
    //console.log("updateTripDateInfo",reqArgu);
    editDao.updateTripDateInfo(reqArgu).then(function (data) {
            //console.log('sortTripDay>>>>',reqArgu,data);
        if (data.rescode) {
            res.json(data);
        }
    });
};
