const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
    const reqData = {
        userId: req.session.member.id,
        page: req.body.page,
        travelId:req.body.travelId
    }
    tripDao.getCollectList(reqData).then((resData) => {
        //console.log(reqData,resData)
        res.json(resData)
    })
}