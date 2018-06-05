const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
  let reqData=req.body
  tripDao.removeCenterAllData(reqData).then((resData) => {
    console.log(reqData,resData)
    res.json(resData)
  })
}