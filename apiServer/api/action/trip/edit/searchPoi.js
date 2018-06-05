const tripDao = require(_rootname + '/api/dao/trip/edit')

module.exports = function (req, res, next) {
    const type = req.body.type
    let uri
    if (type === 'poiPlay') uri = 'searchPoi'
    const reqData = {
        cityId: req.body.cityId,
        travelId: req.body.travelId,
        page: req.body.page,
        name: req.body.name
    };
    console.log("搜索游玩的poi数据",uri);
    tripDao[uri](reqData).then((resData) => {
        //console.log("搜索游玩的poi数据",resData)
        res.json(resData)
    })
}