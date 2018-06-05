<template>
  <div class="threeStep step">
			<p class="findPwTitle">密码重置</p>
			<ul class="clearfix stepBar">
				<li class="fl opc">
					<b>1</b> 填写邮箱
				</li>
				<li class="fl opc">
					<b>2</b> 邮箱验证
				</li>
				<li class="fl">
					<b>3</b> 重置密码
				</li>
				<li class="fl font-12-001">
					<b>4</b> 完成
				</li>
			</ul>
			<p class="currEmail">
				<i class="currEmailTitle">当前邮箱</i>
				<span class="">{{registerEmail}}</span>
			</p>
			<ol class="stepInner" id="threeStepInner">
				<li>
					<label>新密码</label>
					<input type="password" v-model="newPswd" placeholder="请输入验证码" class="ExrCode" id="newExrCode">
				</li>
				<li class="clearfix">
					<input type="password"  v-model="newAgainPswd" placeholder="请再次输入验证码" class="ExrCode" id="newAgainCode">
				</li>
				<li>
                    <p @click="toFinishPage" class="stepInnerBtn" id="threeStepBtn">确认修改</p>
				</li>
			</ol>
            <transition name="fade">
                <p v-show="controlErrMeg" class="prompt">{{errMeg}}</p>
            </transition>
		</div>
</template>
<script>
import { mapGetters } from 'vuex';
import api from '@/handler/tranfer';

export default {
    computed: {
        ...mapGetters(['registerEmail']),
    },
    data () {
        return {
            newPswd:'',
            newAgainPswd:'',
            errMeg:'',
            controlErrMeg:false
        }
    },
    methods: {
        toFinishPage:function(){
            if(this.newPswd!=this.newAgainPswd){
                this.prompt('两次密码输入不一致，请重新输入');
            }else{
                let params={
                    password:this.newPswd,
                    newPassword:this.newAgainPswd,
                    email:this.registerEmail,
                }
                api.post('/login/resetPswd',params).then(res=>{
                    if(res.rescode=='200'){
                        this.$router.push({name:'finish'});
                        this.$store.dispatch('resetPswd');
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
.findPwTitle {
    opacity: 0.8;
    text-align: center;
    padding: 26px 0;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #00192d;
}
.threeStep .stepBar {
    background: url(images/oneStep_03.png) no-repeat;
}
.stepBar {
    background: #eeeff0;
    line-height: 40px;
    width: 433px;
    height: 40px;
}
.stepBar li {
    color: #fff;float: left;
    width: 25%;
    text-align: center;
    opacity: 1;
    font-size: 12px;
}
.stepBar li:last-child {
    padding-right: 25px;
}
.stepBar li.font-12-001 {
    color: #00192d;
    font-size: 12px;
    opacity: .25;
}
.currEmail {
    padding: 39px 40px 0;
}
label {
    display: block;
}
.currEmailTitle, label {
    opacity: 0.8;
    font-style: normal;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #00192d;
    line-height: 14px;
    text-align: left;
}
.currEmail span {
    opacity: 0.6;display: block;
    padding-top: 14px;
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #00192d;
    line-height: 28px;
    text-align: left;
}
#newExrCode {
    margin-top: 7px;
    background: none;
    padding-left: 18px;
}
#threeStepInner {
    padding-top: 30px;
}
.stepInner li {
    padding: 0 30px;
}
.stepInner li:nth-child(2) {
    margin-top: 20px;
}
.stepInner input {
    opacity: 0.9;    padding-left: 18px;
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 6px;letter-spacing: 2px;
    font-size: 14px;
    width: 100%;
    height: 50px;
}
.stepInner {
    padding: 30px 10px;
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
.prompt {
    position: absolute;border: 1px solid #ffb4a8;color: #5c5c5c;
    width: 350px;height: 22px;top:229px;left: 40px;
    background: #fef2f2 url(images/error.png) 3% 50% no-repeat;
    padding-left: 35px;font-size: 12px;line-height: 19px;letter-spacing: 1px;
}
</style>
