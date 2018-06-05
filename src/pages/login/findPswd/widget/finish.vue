<template>
    <div class="fourStep step">
		<p class="findPwTitle">密码重置</p>
		<ul class="clearfix stepBar">
			<li class="fl opc">
				<b>1</b> 填写邮箱
			</li>
			<li class="fl opc">
				<b>2</b> 邮箱验证
			</li>
			<li class="fl opc">
				<b>3</b> 重置密码
			</li>
			<li class="fl">
				<b>4</b> 完成
			</li>
		</ul>
		<p class="right center">
			<img src="./images/right_03.png">
			<span class="rightTitle">密码修改成功，即将跳转登录页面...</span>
			<span class="rightSubTitle">（<i>{{i}}</i>s）</span>
		</p>
		<p class="successTip center">
			<i></i>
			<span>请妥善保管好相关账户密码<router-link :to="{name:'login'}">立刻登录</router-link></span>
		</p>
	</div>
</template>
<script>
export default {
    data () {
        return {
            i:5
        }
    },
    created () {
        setInterval(()=>{this.i--; },1000);
        
    },
    watch: {
        'i':function(){
            if(this.i<1){
                console.log("33333",this.i)
                this.$router.push({path:'/'})  
            }
        }
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
.stepBar li:last-child {
    padding-right: 25px;
}
.fourStep .stepBar {
    background: url(images/oneStep_04.png) no-repeat 100%;
}
.center {
    margin: 0 auto;
    text-align: center;
}
.right img {
    width: 100px;
    height: 100px;
    margin: 39px auto 30px;
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
.stepBar li.opc {
    opacity: .5;
}
.rightTitle {
    opacity: 0.8;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #00192d;
    line-height: 20px;
    text-align: center;
}
.rightSubTitle {
    opacity: 0.25;display: block;
    padding-top: 8px;
    font-family: HiraginoSansGB-W6;
    font-weight: bold;
    font-size: 16px;
    color: #00192d;
    line-height: 16px;
    text-align: center;
}
.successTip {
    padding-top: 40px;
}
.successTip span {
    background: rgba(5,136,243,0.7	5);
    margin: 0 auto;
    border-radius: 4px;
    font-size: 14px;
    color: rgba(0,0,0,0.40);
    font-family: PingFangSC-Regular;
    width: 373px;
    line-height: 76px;
    height: 76px;
}
.successTip i {
    border-top: 2px dashed #ccc;
    display: block;
    width: 100%;
    padding-top: 20px;
}
.successTip a {
    display: inline;
    color: #0c8cf3;
    border-bottom: 1px solid #0c8cfc;
    margin-left: 5px;
}
</style>

