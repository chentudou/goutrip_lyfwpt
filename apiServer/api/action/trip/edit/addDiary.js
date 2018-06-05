const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
    const reqData = req.body;
    tripDao.addDiary(reqData).then((resData) => {
        res.json(resData)
    })
}