const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
    const reqData = {
        type: req.body.type,
        dayId: req.body.dayId,
        shift: req.body.shift,                      // 班次
        cityStation: req.body.cityStation,                // 出发城市
        departureAirport: req.body.departureAirport,           // 出发机场
        departureTime: req.body.departureTime,              // 出发时间
        departureHour: req.body.departureHour,              // 出发小时
        departureMinute: req.body.departureMinute,            // 出发分钟
        endCity: req.body.endCity,                    // 到达城市
        endStation: req.body.endStation,                 // 到达机场
        arrivalTime: req.body.arrivalTime,                // 到达时间
        arrivalHour: req.body.arrivalHour,                // 到达小时
        arrivalMinute: req.body.arrivalMinute,              // 到达分钟
        costPrice: req.body.costPrice                   // 花费
    }
    console.log('reqData',reqData)
    tripDao.addFlight(reqData).then((resData) => {
        res.json(resData)
    })
}