const ralP = require('../../ral')
const pageRow = 10 // poi列表每一页需要展示的列表个数

// 获取游玩的poi数据
module.exports.getPlayList = postData => {
    return ralP("QUERY", {
        path: '/poi/getAllPOIByCityId',
        data: {
            cityId: postData.cityId,
            travelId: postData.travelId,
            page: postData.page,
            pageRow: pageRow
        }
    })
};
// 搜索游玩的poi数据
module.exports.searchPoi = postData => {
    console.log('搜索游玩的poi数据',postData)
    return ralP("QUERY", {
        path: '/poi/getAllPOI',
        data: {
            cityId: postData.cityId,
            travelId: postData.travelId,
            page: postData.page,
            pageRow: pageRow,
            name: postData.name
        }
    })
}
// 获取收藏列表
module.exports.getCollectList = postData => {
    return ralP("QUERY", {
        path: '/bookMarks/getBookMarkByUserId',
        data: {
            userId: postData.userId,
            page: postData.page,
            pageRow: pageRow,
            travelId:postData.travelId
        }
    })
}
// 获取中间的列表
module.exports.getCenterList = postData => {
    return ralP("QUERY", {
        path: '/event/getEvents',
        data: {
            dayId: postData.dayId
        }
    })
}
// 中间的列表拖动
module.exports.centerListDrag = postData => {
    return ralP("BODY", {
        path: '/event/recordEvents',
        data: {
            start_id: postData.start_id,
            end_id: postData.end_id
        }
    })
}
// 删除中间列表中的一条
module.exports.removeCenterItemData = postData => {
    return ralP("BODY", {
        path: '/event/deleteEventId',
        data: {
            eventId: postData.eventId
        }
    })
}
/* 删除当天所有行程 */
module.exports.removeCenterAllData = postData => {
    return ralP("BODY", {
        path: '/event/deleteEvent',
        data: {
            dayId: postData.dayId
        }
    })
}
// 添加和取消收藏
module.exports.collect = postData => {
    return ralP("BODY", {
        path: '/bookMarks/addBookMark',
        data: {
            userId: postData.userId,
            focusId: postData.focusId,
            type: postData.type,
            travelId:postData.travelId
        }
    })
}
// 添加poi到中间的列表中
module.exports.addPoiToList = postData => {
    console.log('添加poi到中间的列表中',postData)
    return ralP("BODY", {
        path: '/event/insertEvent',
        data: {
            type: postData.type,
            dayId: postData.dayId,
            productId: postData.productId
        }
    })
}
// 添加poi到中间时，判断列表是否已经添加过此景点
module.exports.isExistPoi = postData => {
    console.log('判断列表是否已经添加过此Poi',postData)
    return ralP("BODY", {
        path: '/event/CopyPoiEvent',
        data: {
            dayId: postData.dayId,
            productId: postData.productId
        }
    })
}
// 添加Classic到中间时，判断列表是否已经添加过此景点
/* module.exports.isExistClassic = postData => {
    console.log('判断列表是否已经添加过此Classic',postData)
    return ralP("BODY", {
        path: '/event/CopyTravelContent',
        data: {
            dayId: postData.dayId,
            dayIdCopy: postData.productId
        }
    })
} */

/* 获取最左侧日期列表 */
module.exports.getDateList = postData => {
    //console.log('获取最左侧日期列表',postData)
    return ralP("BODY", {
        
        path: '/travel/getCustomDayList',
        data: {
            userId: postData.userId,
            travelId: Number(postData.travelId)
        }
    })
};
/* 修改最左侧行程日期 */
module.exports.updateTripTime = postData => {
    //console.log('获取最左侧日期列表',postData)
    return ralP("BODY", {
        path: '/travel/updateTravelById',
        data: {
            travelId: Number(postData.travelId),
            travelTime:postData.travelTime,
            backtravelTime:postData.backtravelTime
        }
    })
};
/* 删除行程天 */
module.exports.delTripDay = postData => {
    //console.log('删除行程天', postData);
    return ralP("BODY", {
        path: '/travel/deleteTravelDay',
        data: {
            userId: postData.userId,
            dayId: postData.dayId
        }
    })
};
/* 插入行程天 */
module.exports.insertTripDay = postData => {
    //console.log('插入行程天',postData);
    return ralP("BODY", {
        path: "/travel/insertTravelDay",
        data: {
            userId: postData.userId,
            id: postData.id,
            type: postData.type
        }
    });
};
/* 行程天重新排序 */
module.exports.sortTripDate = postData => {
    console.log('行程天重新排序',postData);
    return ralP("BODY", {
        path: "/travel/sortTravelDay",
        data: {
            startId: postData.startId,
            endId: postData.endId?postData.endId:0,
            userId: postData.userId
        }
    });
};
/* 修改行程当天目的地 */
module.exports.updateTripCity = postData => {
    //console.log("修改行程当天目的地", postData);
    return ralP("BODY", {
        path: "/travel/updateTravelDay",
        data: {
            cityIds: postData.cityIds,
            dayId: postData.dayId,
            userId: postData.userId,
            originCity: postData.originCity || '',
            dayName: postData.dayName
        }
    })
};
/* 修改行程日期的标题、人数数量、备注 */
module.exports.updateTripDateInfo = postData => {
    //console.log('updateTripDateInfo',postData)
    return ralP("BODY",{
        path:"/travel/updateTravel",
        data:{
            travelId: postData.travelId,
            travelName: postData.travelName,
            adultNum: postData.adultNum,
            childrenNum: postData.childrenNum,
            remarks:postData.remarks,
            userId: postData.userId
        }
    })
}
/* 添加航班 */
module.exports.addFlight = postData =>{
    console.log("添加航班",postData)
    return ralP("BODY",{
        path:"/flight/addFlight",
        data:{
            type: postData.type,
            dayId: postData.dayId,
            shift: postData.shift,                      // 班次
            cityStation: postData.cityStation,                // 出发城市
            departureAirport: postData.departureAirport,           // 出发机场
            departureTime: postData.departureTime,              // 出发时间
            departureHour: postData.departureHour,              // 出发小时
            departureMinute: postData.departureMinute,            // 出发分钟
            endCity: postData.endCity,                    // 到达城市
            endStation: postData.endStation,                 // 到达机场
            arrivalTime: postData.arrivalTime,                // 到达时间
            arrivalHour: postData.arrivalHour,                // 到达小时
            arrivalMinute: postData.arrivalMinute,              // 到达分钟
            costPrice: postData.costPrice          
        }
    })
}
/* 查询当天的日记 */
module.exports.queryDiary= postData => {
    console.log('查询当天的日记',postData)
    return ralP("BODY",{
        path:"/event/getEventMarkers",
        data:{
            dayId:postData.dayId
            }
    })
}
/* 添加当天的日记 */
module.exports.addDiary = postData =>{
    return ralP("BODY",{
        path:"/event/updateEventMarkers",
        data:{
            dayId:postData.dayId,
            title:postData.title,
            travelDescription:postData.travelDescription
        }
    })
}
/* 获取经典路线的列表数据 */
module.exports.getClassicList= postData =>{
    console.log("111111111111",postData)
    return ralP("BODY",{
        path:"/travel/getTravelTemplateList",
        data:{
            cityId:postData.cityId,
            page:postData.page||1,
            pageRow:postData.pageRow||10
        }
    })
}
/* 添加经典行程到中间列表 */    
module.exports.addClassicTrip=postData=>{
    return ralP("BODY",{
        path:"/travel/copyTemplateTravel",
        data:{
            dayId:postData.dayId,
            dayIdCopy:postData.classicTripDayId
        }
    })
}
/* 反馈 */
module.exports.feedback=postData=>{
    //console.log('反馈',postData)
    return ralP("BODY",{
        path:"/feedback/insertFeedBack",
        data:{
            userId:postData.userId,
            feedbackName:postData.feedbackName
        }
    })
}