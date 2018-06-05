var manage = require(_rootname + '/api/dao/manage.js');
const formidable = require('formidable');
const fs = require("fs");
const util = require("util");
const path = require("path");
/* 引入辅助函数 */
const dirMaxVal=require(_rootname+'/handler/dirMaxVal');
const currDate=require(_rootname+'/handler/currDate');
const customNumStr=require(_rootname+'/handler/customNumStr');


module.exports = function (req, res) {
    let reqArgu = req.body;
    var form = new formidable.IncomingForm({
        uploadDir: _rootname + "/logs/uploads", //上传目录，指的是服务器的路径，如果不存在将会报错。
        keepExtensions: true, //保留后缀
        maxFieldsSize: 2 * 1024 * 1024 //byte//最大可上传大小
    });
    
    let i = dirMaxVal(form.uploadDir);
    form.parse(req, (err, fields, files) => {
        if (err) {
            throw err;
        }
        let extname = path.extname(files.logoImg.name); //拿到扩展名
        let oldpath = path.normalize(files.logoImg.path); //旧的路径
        let x = 'logo_' + currDate() + '_' + customNumStr(++i); //新的文件名
        let newpath = _rootname + "/logs/uploads/" + x + extname; //新的文件路径   
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                console.error("改名失败" + err);
            }else{
                manage.imgLib(newpath).then(function (data) {
                    data = JSON.parse(data);
                    console.log(data);
                    if (data.rescode) {
                        if (data.rescode == '200') {
                            //let x = 'logo_'+currDate()+'_'+ customNumStr(++i);
                            //console.log(x);
                            fs.unlink(newpath, () => {
                                console.log('上传成功后，修改头像的本地服务下的文件已删除');
                            });
                        }
                        res.json(data);
                    }
                })
            }
            //console.log('oldpath,newpath',oldpath,newpath);  
        });
        //const imgPath = (files.logoImg.path);
        //console.log('imgPath,newpath',imgPath,newpath);
        /* manage.imgLib(newpath).then(function (data) {
            data = JSON.parse(data);
            console.log(data);
            if (data.rescode) {
                if (data.rescode == '200') {
                    //let x = 'logo_'+currDate()+'_'+ customNumStr(++i);
                    //console.log(x);
                    fs.unlink(imgPath, () => {
                        console.log('上传成功后，修改头像的本地服务下的文件已删除');
                    });
                }
                res.json(data);
            }
        }) */
    })
    return;

};
