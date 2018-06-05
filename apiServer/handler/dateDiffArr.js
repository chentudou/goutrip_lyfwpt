/* 
獲取日期差之間的日期數組
*/

const formatDate=require(_rootname+'/handler/formatDate');


module.exports = time => {
    var times = new Date(time[1]).getTime() - new Date(time[0]).getTime();
    var days = times / (1000 * 60 * 60 * 24);
    var timeArr = [];
    if (days > 1) {
        var time = time[0];
        var num = 2;
        for (var i = 1; i < days; i++) {
            time = formatDate(time, 1);
            num = num + 1;
            timeArr.push(time);
        }
        return timeArr;
    }else{
        return time;
    }
}