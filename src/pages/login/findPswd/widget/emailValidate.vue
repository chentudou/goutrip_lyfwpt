<template>
  <div class="twoStep step">
		<p class="findPwTitle">邮箱验证</p>
		<ul class="clearfix stepBar">
			<li class="fl opc">
				<b>1</b> 填写邮箱
			</li>
			<li class="fl">
				<b>2</b> 邮箱验证
			</li>
			<li class="fl font-12-001">
				<b>3</b> 重置密码
			</li>
			<li class="fl font-12-001">
				<b>4</b> 完成
			</li>
		</ul>
		<p class="plance">
			<img src="./images/plance.png">
			<span class="planceTitle">验证邮件已发送成功，马上验证</span>
			<span class="planceSubTitle">我们已向<i>{{registerEmail}}</i>发送验证码，请在下方输入框输入验证码进行验证。</span>
		</p>
		<ol class="stepInner" id="twoStepInner">
			<li class="clearfix">
				<input type="text" v-model="emailCaptchaVal" placeholder="请输入验证码" class="ExrCode" id="emailExrCode">
				<button class="ExrCodeBtn" @click="againEmailCaptcha" id="againCodeBtn">重新发送</button>
			</li>
			<li>
                <p @click="toResetPswdPage" class="stepInnerBtn" id="twoStepBtn">下一步</p>
			</li>
		</ol>
        <transition name="fade">
            <p v-show="controlErrMeg" class="prompt">{{errMeg}}</p>
        </transition>
	</div>
</template>
<script>
import api from '@/handler/tranfer';
import { mapGetters } from 'vuex';
export default {
    computed: {
      ...mapGetters(['registerEmail','isEmailCode']),
    },
    data () {
        return {
            emailCaptchaVal:'',
            controlErrMeg:false,
            errMeg:''
        }
    },
    methods: {
        toResetPswdPage:function(){
            this.emailCaptchaVal==this.isEmailCode?this.$router.push({name:'resetPswd'}):this.prompt('验证码输入错误');
        },
        /* 重新发送，获取验证码 */
        againEmailCaptcha:function(){
            let params={
                email:this.registerEmail
            }
            api.post('/login/isEmail',params).then(res=>{
                if(res.rescode=='200'){
                    this.prompt('验证码已发送，请查收');
                    let registerInfo={
                        captcha:res.item.code
                    }
                    this.$store.dispatch('registerInfo',registerInfo);   
                }else{
                    this.$router.push({name:'fillEmail'})
                }
            })
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
/* 第二步邮箱验证 */
#twoStepBtn{margin-top: 4px;}
.twoStep{
	height: 542px;
}
.twoStep .stepBar{
background-image: url(images/oneStep_02.png);background-repeat: no-repeat;
}
.findPwTitle {
    opacity: 0.8;
    text-align: center;
    padding: 26px 0;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #00192d;
}
.stepBar {
    background: #eeeff0;
    line-height: 40px;
    width: 433px;
    height: 40px;
}
.stepBar li{
float: left;width: 25%;text-align: center;
}
.stepBar li{
		color: #fff;opacity: 1;font-size: 12px;
}
.plance img {
    width: 100px;
    height: 100px;
    margin: 40px auto 18px;
}
.planceTitle {
    opacity: 0.8;
    font-family: PingFangSC-Regular;
    text-align: center;
    font-size: 20px;display: block;
    color: #00192d;
}
.planceSubTitle {
    opacity: 0.5;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    width: 249px;display: block;
    margin: 7px auto;
    color: #00192d;
    line-height: 20px;
}
.stepInner li {
    padding: 0 30px;
}
#twoStepInner {
    padding: 30px 10px;
}
#emailExrCode {
    background: none;
    padding-left: 18px;
    width: 56.7%;
}
.stepInner input {
    opacity: 0.9;
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 6px;letter-spacing: 2px;
    font-size: 14px;
    width: 100%;
    height: 50px;
}
#againCodeBtn {
    border: 1px solid #0689f3;
    font-size: 16px;
    color: #0689f3;
    width: 34.6%;
    text-align: center;
}
.ExrCodeBtn {
    float: right;
    width: 34.5%;
    opacity: 0.9;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.10);
    border-radius: 6px;
    height: 50px;
}
.stepInnerBtn {
    color: #fff;
    border: 0;
    margin-top: 24px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    background: #0689f3;
    width: 100%;
    height: 52px;text-align: center;
    line-height: 52px;
}
.stepInner li:nth-child(2) {
    margin-top: 20px;
}
.prompt {
    position: absolute;border: 1px solid #ffb4a8;color: #5c5c5c;
    width: 200px;height: 22px;top: 360px;left: 40px;
    background: #fef2f2 url(images/error.png) 3% 50% no-repeat;
    padding-left: 35px;font-size: 12px;line-height: 19px;letter-spacing: 1px;
}
</style>
