var svgCaptcha = require('svg-captcha');

module.exports = function (req,res) {
    let reqArgu=req.query;
    if(reqArgu.type=='findPswd'){
        let options={
            size:4,
            ignoreChars:'0o1ilOI',
            noise:1,
            color:true,
            background:'#eee',   
        }
        svgCaptcha.options.width=120;
        var captcha = svgCaptcha.create(options);
        req.session.currCaptcha = captcha.text.toLowerCase();
        res.type('svg');    
        res.send(captcha.data);
    }else if(reqArgu.type=='captchaValidate'){
        let reqCaptcha=reqArgu.captcha.toLowerCase();
        //console.log('reqCaptcha',reqCaptcha,req.session.currCaptcha);
        if(reqCaptcha==req.session.currCaptcha){
            res.send({msg:'验证码输入正确，请稍后...',code:'200'});
        }else{
            res.send({msg:'验证码输入错误',code:'999'});
        }
    }else{
        return false;
    }
};