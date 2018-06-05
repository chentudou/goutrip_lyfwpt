const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
    const type = req.body.type
    let uri
    if (type === 'poiPlay') uri = 'getPoiPlay';
    //console.log(type);
    const reqData = {
        userId: req.session.member.id,
        cityId: req.body.cityId,
        travelId: req.body.travelId,
        page: req.body.page
    }
    tripDao.getPlayList(reqData).then((resData) => {
        res.json(resData)
    })
}