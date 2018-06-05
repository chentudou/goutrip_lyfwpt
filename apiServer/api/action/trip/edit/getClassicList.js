const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
    let reqData = req.body;
    tripDao.getClassicList(reqData).then((resData) => {
        res.json(resData)
    })
}