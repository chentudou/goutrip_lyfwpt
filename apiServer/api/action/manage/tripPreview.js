var manage = require(_rootname + '/api/dao/manage.js');

module.exports = function (req, res) {

    let reqArgu = {
        userId: req.session.member ? req.session.member.id : req.session.member.userId,
        travelId: req.body.travelId
    };
    //console.log(reqArgu);
    manage.tripPreview(reqArgu).then(function (data) {
        /* if (data.rescode) {
            res.json(data);
        } */
        res.render(_rootname +'/view/preview.thml',data);
    });
};