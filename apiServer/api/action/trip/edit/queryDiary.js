const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
    const reqData = req.body;
    tripDao.queryDiary(reqData).then((resData) => {
        res.json(resData)
    })
}