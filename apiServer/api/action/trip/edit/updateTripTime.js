var editDao = require(_rootname + '/api/dao/trip/edit');

module.exports = function (req, res) {

    let reqArgu = req.body;
    editDao.updateTripTime(reqArgu).then(function (data) {
            console.log('sortTripDay>>>>',reqArgu,data);
        if (data.rescode) {
            res.json(data);
        }
    });
};