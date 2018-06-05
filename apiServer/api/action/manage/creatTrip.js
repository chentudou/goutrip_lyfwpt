var manage = require(_rootname+'/api/dao/manage.js');
/* 引入辅助函数 */
const formatDate=require(_rootname+'/handler/formatDate');
const dateDiffArr=require(_rootname+'/handler/dateDiffArr');
const customNumArr=require(_rootname+'/handler/customNumArr');


module.exports = function (req,res) {
    let reqArgu=req.body;
     /* userId */
     reqArgu.userId=req.session.member?req.session.member.id:'';
    /* 設置默認backCity */
    !reqArgu.backCity||reqArgu.backCity==""?reqArgu.backCity=reqArgu.goCity:"北京市";
    /* 設置默認backCityId */
    !reqArgu.backCityId||reqArgu.backCityId==""?reqArgu.backCityId=reqArgu.goCityId:301;
    /* 處理時間數組 */
    var start=formatDate(reqArgu.travelTime[0],0);
    var end=formatDate(reqArgu.travelTime[1],0);
    /* dayTime由 travelTime 生成并轉為字符串 */
    reqArgu.travelTime=start;//開始日期
    reqArgu.backTravelTime=end;//返回日期
    manage.creatTrip(reqArgu).then(function (data) {
        if(data.rescode){
            res.json(data);            
        }
    });
};

    