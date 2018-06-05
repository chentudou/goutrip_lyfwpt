    
    
    
    /* 根据初始dayId和长度（天数）生成id数组 */
    module.exports = (initVal, l) => {
        let days = Number(l); /* 生成几天的dayId值（最小大于2） */
        var timeArr = [initVal];
        for (var i = 0; i < days - 1; i++) { //最终结果是以initVal为首,所以减少一天的插入
            timeStamp += 1;
            timeArr.push(initVal);
        }
        return timeArr;
    }