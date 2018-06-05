const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const swig =require('swig');


const path = require('path');
const proxy = require('./api/config/fetch');

global._rootname = path.join(__dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
/* 文件上传 */
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(bodyParser.json({limit:'1mb'}));
/* app.use('/aaa',function(req,res,next){
    console.log('next',req.url);
    next();
}) */
app.use(session({
    secret: 'token', // 与cookieParser中的一致
    resave: true,
    saveUninitialized: true
}))
/* app.use('/api/transfer', proxy);
 */
app.use('/transfer', proxy);

/*  配置应用模板swig
 定义当前应用所使用的模板引擎
 第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
 */
app.engine('html',swig.renderFile);

// 设置模板文件的目录，第一个参数必须是views (文件夹名称) 第二个参数是目录路径
app.set('views','./view');
// 注册所用的模板引擎，第一个参数必须是 view engine，
// 第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine','html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false});

/* const staticOptions={
    dotfiles:'ignore',
    etag:false,
    extensins:['htm','html','css','png','gif','jpg','js','tpl'],
    index:false,
    redirect: false
} */

/* app.use(express.static(__dirname+'./dist',staticOptions));
 */
/* 静态资源访问 */
app.use('/static',express.static(__dirname+'/static'));

app.use('/book',require('./handler/tripPreview'));
/* app.use('/',require('./handler/dist'));
 */
var server = app.listen(8061, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host",host,port);
    console.log('Example app listening at http://%s:%s', host, port);
});