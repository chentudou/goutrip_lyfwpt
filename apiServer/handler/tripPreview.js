const express =require('express');
const router=express.Router();//创建路由对象
var previewDao = require(_rootname + '/api/dao/trip/preview.js');


    
router.get('/index',(req,res)=>{
    let reqArgu = req.query;
    //res.render('tripBook/preview');
    //reqArgu.userId = req.session.member ? req.session.member.id : req.session.member.userId;
    previewDao.preview(reqArgu).then(function (resp) {
        console.log(reqArgu);
        if (resp.rescode == '200') {
            let newItems=resp.items.splice(0, resp.items.length - 1);
            let date=designSizeDate(resp.items[resp.items.length-1].customTravel.travelTime, newItems.length);
            newItems.map((item,i)=>{
                item.date=date[i];
            })
            newData={
                items:  newItems,
                travel: resp.items[0].customTravel,
                fixed:  resp.items[0].customPdf
            }
            //console.log('tripBook',newData)
            res.render('trip/preview',{newData});
        }
    });
})
module.exports=router;

let weekArr=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

function designSizeDate(initDate, l) {
    /* 日期转时间戳（1，避免跨月计算，2，可加减） */
    var timeStamp = new Date(initDate).getTime();
    var days = Number(l); /* 生成几天的日期数组（最小大于2） */
    var timeArr = [`${timeStampToDate(initDate)} ${weekArr[new Date(initDate).getDay()]}`];
    for (var i = 0; i < days - 1 ; i++) { //最终结果是以initDate为首,所以减少一天的插入
        timeStamp += (1000 * 60 * 60 * 24);
        timeArr.push(`${timeStampToDate(timeStamp)} ${weekArr[new Date(timeStamp).getDay()]}`);
    }
    return timeArr;
}
function timeStampToDate(time, n) {
    var dd = new Date(time);
    n ? dd.setDate(dd.getDate() + n) : dd.setDate(dd.getDate()); //获取n天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    //如果月份长度少于2，则前加 0 补位
    if (m.toString().length == 1) {
        m = 0 + "" + m.toString();
    } else {
        m = m.toString();
    }
    //如果天数长度少于2，则前加 0 补位
    if (d.toString().length == 1) {
        d = 0 + "" + d.toString();
    } else {
        d = d.toString();
    }

    return y + "-" + m + "-" + d;
}