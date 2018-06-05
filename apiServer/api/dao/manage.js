const ralP = require('../ral');
var fs = require("fs");

/*  国外目的地城市列表接口*/
module.exports.selectCityAbroad = function (postData) {
    //console.log('行程创建页面城市列表接口',postData)
    return ralP("QUERY", {
        path: '/travel/toCreate'
    })
};
/* 国内城市列表接口 */
module.exports.selectCityInternal = function (postData) {
    //console.log('行程创建页面城市列表接口',postData)
    return ralP("QUERY", {
        path: '/city/getCityInternalList'
    })
};
/* 行程创建接口 */
module.exports.creatTrip = function (postData) {
    //console.log('行程创建接口',postData)
    return ralP("BODY", {
        path: '/travel/addTravel',
        data: {
            travelTime: postData.travelTime || '', //出发时间
            backTravelTime: postData.backTravelTime || '', //返回时间
            goCity: postData.goCity || '', // 出发城市 
            goCityId: postData.goCityId || '', //出发城市id
            backCity: postData.backCity || '', // 返回城市 
            backCityId: postData.backCityId || '', //返回城市iD
            addressCity:postData.addressCity,//首发目的地
            addressCityId:postData.addressCityId,//首发目的地ID
            adultNum: postData.adultNum || 0, //成人数量
            childrenNum: postData.childrenNum || 0, //儿童数量
            travelName: postData.travelName || '', //行程名称
            remarks: postData.remarks || '', //备注
            userId: postData.userId || '', //用户ID
        }
    });
};
/* 修改用户信息 */
module.exports.update = function (postData) {
    //console.log('修改用户信息', postData)
    return ralP("BODY", {
        path: '/user/updateUser',
        data: {
            address: postData.address,
            realname: postData.realname,
            mobileNumber: postData.mobileNumber,
            email: postData.email,
            logoImg: postData.logoImg,
            userId: postData.userId,
        }
    })
};
/* 图片上传 */
module.exports.imgLib = function (postData) {
    //console.log('图片上传DAo', postData);
    return ralP("IMG_UPLOAD", {
        path: '/logImage/upload',
        data: {
            file: fs.createReadStream(postData)
        }
    });
};
/* 子账户列表 */
module.exports.subaccount = postData => {
    //console.log('子账户列表', postData);
    return ralP("QUERY", {
        path: '/user/getUserAccountList',
        data: {
            userId: postData.userId
        }
    });
};
/* 添加子账户*/
module.exports.addSubaccount = postData => {
    //console.log('添加子账户',postData)
    return ralP("BODY", {
        path: '/user/insertUserAccount',
        data: {
            userId: postData.userId,
            name: postData.name,
            newPassword: postData.password,
        }
    });
};
/* 修改子账户密码 */
module.exports.updateSubPswd = postData => {
    //console.log('修改子账户密码',postData)
    return ralP("BODY", {
        path: '/user/UpdateUserAccount',
        data: {
            userId: postData.userId,
            password: postData.password,
            passwordconfirm: postData.password,
        }
    });
};
/* 修改原密码 */
module.exports.updatePswd = postData => {
    //console.log('修改原密码',postData)
    return ralP("BODY", {
        path: '/user/updateUsPwd',
        data: {
            userId: postData.userId,
            oldPassword: postData.oldPassword,
            password: postData.password
        }
    });
};
/* 获取我的行程列表 */
module.exports.travelList = postData => {
    console.log('我的行程列表', postData);
    return ralP("QUERY", {
        path: '/travel/getTravelList',
        data: {
            userId: postData.userId,
            page: postData.page || 1,
            pageRow: postData.pageRow || 8,
            travelId: postData.travelId || ''
        }
    })
};
/* 复制行程 */
module.exports.copyTrip = postData => {
    return ralP("BODY", {
        path: '/travel/copyTravel',
        data: {
            userId: postData.userId,
            travelId: postData.travelId
        }
    })
};
/* 删除行程 */
module.exports.delTrip = postData => {
    return ralP("BODY", {
        path: '/travel/deleteTravel',
        data: {
            userId: postData.userId,
            travelId: postData.travelId
        }
    })
};
