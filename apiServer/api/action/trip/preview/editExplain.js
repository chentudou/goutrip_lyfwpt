var previewDao = require(_rootname + '/api/dao/trip/preview.js');

module.exports = function (req, res) {

    let reqArgu = req.body;
    //console.log('editExplain>>>>',reqArgu);
    previewDao.editExplain(reqArgu).then(function (data) {
            console.log('getDateList>>>>',reqArgu,data);
        if (data.rescode) {
            res.json(data);
        }
    });
};