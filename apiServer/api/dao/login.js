const ralP=require('../ral');

//登录
module.exports.login=function(postData){
    //console.log('登录',postData)
    return ralP("BODY",{
        path:'/user/login',
        data:{
            name: postData.name,
            password:postData.password,
        }
    })
};
//注册
module.exports.register=function(postData){
    return ralP("BODY",{
        path:'/user/addUser',
        data:{
            companyName: postData.companyName,
            brandName:postData.brandName,
            address:postData.address,
            contactName:postData.contactName,
            sex:postData.sex,
            mobile:postData.mobile,
            email:postData.email,
        }
    })
};  
/* 找回密码 */
module.exports.findPswd=function(postData){
    return ralP("BODY",{
        path:'/user/addUser',
        data:{
            companyName: postData.companyName,
            brandName:postData.brandName,
            address:postData.address,
            contactName:postData.contactName,
            sex:postData.sex,
            mobile:postData.mobile,
            email:postData.email,
        }
    })
};
/* 验证邮箱是否存在 */
module.exports.isEmail=function(postData){
    return ralP("BODY",{
        path:'/email/Emailyz',
        data:{
            email:postData.email,
        }
    });
};
/* 重置密码 */
module.exports.resetPswd=function(postData){
    return ralP("BODY",{
        path:'/email/UpdatePwd',
        data:{
            email:postData.email,
            newPassword:postData.newPassword,
            password:postData.password,
        }
    });
};