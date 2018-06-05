const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
    const reqData = {
        userId: req.session.member.id,
        focusId: req.body.focusId,
        type: req.body.type,
        travelId:req.body.travelId
    }
    tripDao.collect(reqData).then((resData) => {
        res.json(resData)
    })
}