    
    
    
    /* 根据初始日期和长度（天数）生成日期数组 */
    module.exports = (initDate, l) => {
        /* 日期转时间戳（1，避免跨月计算，2，可加减） */
        let timeStamp = new Date(initDate).getTime();
        let days = Number(l); /* 生成几天的日期数组（最小大于2） */
        var timeArr = [initDate];
        for (var i = 0; i < days - 1; i++) { //最终结果是以initDate为首,所以减少一天的插入
            timeStamp += (1000 * 60 * 60 * 24);
            timeArr.push(timeStamp);
        }
        return timeArr;
    }