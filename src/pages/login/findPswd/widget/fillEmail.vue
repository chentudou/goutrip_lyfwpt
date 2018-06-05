<template>
    <div class="oneStep step">
		<p class="findPwTitle">找回密码</p>
		<ul class="clearfix stepBar">
			<li class="fl">
				<b>1</b> 填写邮箱
			</li>
			<li class="fl font-12-001">
				<b>2</b> 邮箱验证
			</li>
			<li class="fl font-12-001">
				<b>3</b> 重置密码
			</li>
			<li class="fl font-12-001">
				<b>4</b> 完成
			</li>
		</ul>
		<ol class="stepInner">
			<li class="">
				<input type="text" @blur="emailValidate" v-model="registerEmail" placeholder="请输入注册时使用的邮箱地址" name="" class="Email " id="registerEmail">
			</li>
			<li class="clearfix">
				<input type="text" v-model="captchaVal" name="" placeholder="请输入验证码" class="ExrCode" id="passwdExrCode">
				<p class="ExrCodeBtn" @click="againCaptcha" id="obtainCodeBtn" v-html="captcha"></p>
			</li>
			<li>
				<p @click="toEmailValidatePage" class="stepInnerBtn" id="nowFindBtn">立即找回</p>
			</li>
		</ol>
        <transition name="fade">
            <p v-show="controlErrMeg" class="prompt">{{errMeg}}</p>
        </transition>
	</div>
</template>
<script>
import api from '@/handler/tranfer';

export default {
    data () {
        return {
            captcha:'',
            registerEmail:'',
            controlErrMeg:false,
            captchaVal:'',
            errMeg:'',
            isEmail:false
        }
    },
    created () {
        this.getCaptcha();
    },
    methods: {
        /* 找回密码--时用到验证码需要传值type='findPswd' */
        getCaptcha:function(){
            api.get('/login/captcha',{type:'findPswd'}).then(res=>{
                this.captcha=res;
            })
        },
        againCaptcha:function(){
            this.getCaptcha();
        },
        toEmailValidatePage:function(){
            if(!this.registerEmail){
                this.prompt("请先输入邮箱");
                return false;
            }else if(this.registerEmail&&!( /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).test(this.registerEmail)){
                this.prompt("邮箱格式错误，请重新输入");
                return false;
            }else if(!this.captchaVal){
                this.prompt("请先输入验证码");
                return false;
            }else if(this.captchaVal&&this.captchaVal.length<4){
                this.prompt("验证码输入错误，请重新输入");
                return false;
            }else if(this.registerEmail){//如果邮箱已输入，验证邮箱是否已经注册过
                let params={
                    type:'captchaValidate',
                    captcha:this.captchaVal
                }    
                api.get('/login/captcha',params).then(res=>{
                    res.code=='200'&&this.isEmail?this.$router.push({name:'emailValidate'}):this.prompt(res.msg);
                
                });
                return false;
            }
        },
        emailValidate:function(){
            //失去焦点的时候，如果已经填写，并且符合邮箱格式，立马验证邮箱是否注册过
            if(this.registerEmail&&( /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).test(this.registerEmail)){
                let params={
                email:this.registerEmail
                }
                /* 第二步：1.验证code 是否正确--2.可以再次发送并验证 */
                        /* 第三步：1.显示邮箱信息，2.修改密码 */
                api.post('/login/isEmail',params).then(res=>{
                    if(res.rescode!='200'){
                        this.prompt('此邮箱尚未注册');
                    }else{
                    this.isEmail=true;
                    let registerInfo={
                        email:this.registerEmail,
                        captcha:res.item.code
                    }
                    this.$store.dispatch('registerInfo',registerInfo);   
                    }
                })    
            }
        },
        //错误提示
        prompt:function (msg) {
            this.controlErrMeg=true;
            this.errMeg=msg;
            setTimeout( () =>{
                this.controlErrMeg=!this.controlErrMeg;
                this.errMeg="";
            },3000);
        },
    }
}
</script>

<style scoped>
/* 第一步骤的内容 */
.stepInner{padding: 30px 10px;}
.stepInner li{padding: 0 30px;}
.stepInner li:nth-child(2){margin-top: 20px;}
.stepInner input{opacity:0.9;background-color:#ffffff;letter-spacing: 2px;
border:1px solid rgba(0,0,0,0.15);border-radius:6px;font-size: 14px;width:100%;height:50px;}

.stepInner input::-webkit-input-placeholder{opacity:0.25;font-family:PingFangSC-Regular;font-size:14px;color:#00192d;}
.stepInner input:placeholder{opacity:0.25;font-family:PingFangSC-Regular;font-size:14px;color:#00192d;}
.stepInner input:-moz-placeholder{opacity:0.25;font-family:PingFangSC-Regular;font-size:14px;color:#00192d;}
.stepInner input::-moz-placeholder{opacity:0.25;font-family:PingFangSC-Regular;font-size:14px;color:#00192d;}
.stepInner input:-ms-input-placeholder{opacity:0.25;font-family:PingFangSC-Regular;font-size:14px;color:#00192d;}

input.ExrCode{
    background-repeat: no-repeat;background-image: url(images/lock.png);
    background-position: 14px 13px;
    }
.Email{
    background-image: url('images/letter.png');
background-repeat: no-repeat;background-position: 14px 14px;padding-left: 48px;
}
#passwdExrCode{
width: 61.5%;padding-left: 48px;
}
.ExrCodeBtn{
    float: right;width: 34.5%;opacity:0.9;overflow: hidden;
    background:#ffffff;border:1px solid rgba(0,0,0,0.10);
    border-radius:6px;height:50px; line-height: 52px;text-align: center;
}
.stepInnerBtn{
    color:#fff;    border: 0;    margin-top: 24px;
    border: 1px solid #ccc;    line-height: 52px;
    text-align: center;
    border-radius:6px;font-family:PingFangSC-Regular;
    font-size:16px;background:#0689f3;width:100%;height:52px;
}

.findPwTitle {
    opacity: 0.8;
    text-align: center;
    padding: 26px 0;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #00192d;
}
/* 步骤--导航条*/
.stepBar{
background:#eeeff0;line-height: 40px;
width:433px;
height:40px;
} 
.stepBar li{
float: left;width: 25%;text-align: center;
}
.stepBar li{
		color: #fff;opacity: 1;font-size: 12px;
}
.oneStep .stepBar li:first-child{
	background-image: url(images/oneStep_01.png);
}
.stepBar li:last-child{padding-right: 25px;}
.prompt {
    position: absolute;border: 1px solid #ffb4a8;color: #5c5c5c;
    width: 350px;height: 22px;line-height: 22px;top: 127px;left: 40px;
    background: #fef2f2 url(images/error.png) 3% 50% no-repeat;
    padding-left: 35px;font-size: 12px;line-height: 19px;letter-spacing: 1px;
}
</style>
