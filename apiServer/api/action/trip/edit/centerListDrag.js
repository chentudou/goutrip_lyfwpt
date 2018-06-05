const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
    const reqData = {
        start_id: req.body.start_id,
        end_id: req.body.end_id
    }
    tripDao.centerListDrag(reqData).then((resData) => {
        res.json(resData)
    })
}