const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
  const reqData = {
    eventId: req.body.eventId
  }
  tripDao.removeCenterItemData(reqData).then((resData) => {
    console.log(reqData,resData)
    res.json(resData)
  })
}