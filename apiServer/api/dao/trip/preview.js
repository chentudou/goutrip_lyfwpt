const ralP = require('../../ral')

/* 路书预览 */
module.exports.preview=postData=>{
    console.log('tripBook',postData)
    return ralP("BODY",{
        path:"/pdf/bookTravel",
        data:{
            travelId:postData.travelId
        }
    })
}
/* 路书--说明第三方责任 */
module.exports.explain=postData=>{
    console.log('explain',postData)
    return ralP("BODY",{
        path:"/pdf/bookPdf",
        data:{
            travelId:postData.travelId,
        }
    })
};
/* 编辑 --路书  说明内容 */
module.exports.editExplain=postData=>{
    console.log('explain',postData)
    return ralP("BODY",{
        path:"/pdf/savePdfInfo",
        data:{
            travelId:postData.travelId,
            pdfId:postData.pdfId,
            name:postData.name,
            sex:postData.sex,
            offerer:postData.offerer,
            tel:postData.tel,
            wechatId:postData.wechatId,
            remark:postData.remark,
            inClude:postData.inClude,
            outClude:postData.outClude,
            notice:postData.notice,
            notes:postData.notes,
            price:postData.price||0,
            url:postData.url||'1'
        }
    })
}