const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
    const type = req.body.type
    let uri
    if (type === 'poiPlay') uri = 'getPoiPlay'
    const reqData = {
        dayId: req.body.dayId
    }
    tripDao.getCenterList(reqData).then((resData) => {
        //console.log('getCenterList',reqData,resData)
        res.json(resData)
    })
}