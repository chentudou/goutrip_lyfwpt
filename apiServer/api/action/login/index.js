// import { Session } from "inspector";


var login = require(_rootname + '/api/dao/login.js');
module.exports = function (req, res) {
    let reqArgu = req.body;
    let data = {
        rescode: '200'
    }
    login.login(reqArgu).then(function (data) {
        console.log('/api/dao/login.js',reqArgu, data);
        if (data.rescode) {
            req.session.member = data.item;
            res.json(data);
        }
    });
};