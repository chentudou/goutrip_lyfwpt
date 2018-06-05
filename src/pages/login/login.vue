<template>
    <div class="loginPage clearfix" @keyup.enter="callGoLogin">
        <public-head></public-head>
        <!--首屏 开始-->
        <div class="index-bigimg-1">
            <!--登录 开始-->
            <div class="bg_white">
               <!--  <img src="images/indexText.png" alt="" class="fl indexText"> -->
                <ul class="login fr">
                    <li class="userInfo">
                        <input type="text" v-model="userInfo" placeholder="请输入用户名或邮箱">
                    </li>
                    <li class="pswdInfo">
                        <input type="password" v-model="pswdInfo" placeholder="请输入密码">
                    </li>
                    <li class="li_zh_pad">
                        <label for="remember" class="remember">
                            <input v-model="remember" type="checkbox" id="remember">记住账号
                        </label>
                        <router-link :to="{name:'findPswd'}" class="forgetPwd">忘记密码 ?</router-link>
                    </li>
                    <li>
                        <input type="submit" ref="submit" value="登录" id="goLogin" class="loginBtn" @click="goLogin">
                    </li>
                    <li>
                        <router-link :to="{name:'register'}" class="fr register">立即注册<i class="registerArrow"></i></router-link>
                    </li>
                </ul>
                <transition name="fade">
                    <p v-show="controlErrMeg" class="prompt">{{errMeg}}</p>
                </transition>
                
            </div>
        </div>
            <!--首屏 结束-->
            <!--第二部分为什么选择我们 开始-->
        <div>
            <div class="partTwoTit">
                <h2 class="bigTitle title_mp">平台提供制定旅行和小包团行程编辑解决方案</h2>
                <img class='img_title' src="./images/img_title.png" alt="" />
            </div>
            <!--六块介绍 开始-->
            <div class="w1000">
                <ul class="chooseUsBox">
                    <li>
                        <img src="./images/img_title_1.png" alt="">
                        <h3 class="subtitle">信息智能推荐</h3>
                    </li>
                    <li>
                        <img src="./images/img_title_2.png" alt="">
                        <h3 class="subtitle">资源快速报价</h3>
                    </li>
                    <li>
                        <img src="./images/img_title_3.png" alt="">
                        <h3 class="subtitle">产品快捷预定</h3>
                    </li>
                    <li>
                        <img src="./images/img_title_4.png" alt="">
                        <h3 class="subtitle">行程一键导出</h3>
                    </li>
                </ul>
            </div>
            <!--六块介绍 结束-->
        </div>
        <!--为什么选择我们 结束-->
        <!--成为我们的合作伙伴 开始-->
        <div class="indexThree">
            <div class="partTwoTit">
                <h2 class="bigTitle mp">我们能帮您做什么</h2>
                <img class='img_title' src="./images/img_title.png" alt="" />
            </div>
            <div class="stepBox">
                <div class="steps">
                    <img class='step_img1' src="./images/img_banner1.png" alt="">
                    <div class="step_text step_left">
                        <h3>8分钟搞定行程<br>编辑提升效率</h3>
                        <p>模块化操作，提升行程编辑效率<br>智能算法应对多变的定制需求</p>
                    </div>
                </div>
                <div class="steps">
                    <div class="step_text step_right">
                        <h3>分屏预览路书，节约沟通成本</h3>
                        <p>移动端和PC端分屏展现精美行程<br>一键分享客人，提升服务效率</p>
                        <img class='img_ma' src="./images/img_ma.png" alt="">
                        <span class='img_text_span'>扫码查看案例</span>
                    </div>
                    <img class='step_img2' src="./images/img_banner2.png" alt="">
                    
                </div>
                <div class="steps">
                    <div class="step_text step_right">
                        <h3>连接海量资源，分分钟<br>就能报价</h3>
                        <p>模块化操作，提升行程编辑效率<br>智能算法应对多变的定制需求</p>
                    </div>
                    <img class='step_img3' src="./images/img_banner3.png" alt="">
                    
                </div>
                <div class="steps">
                    <img class='step_img4' src="./images/img_banner4.png" alt="">
                    <div class="step_text step_left">
                        <h3>全方位产品服务，降低人力成本</h3>
                        <p>智能推荐+景点模板即带你玩转当地，不熟悉也可以很专业，一对一跟进，全方位产品支持和服务</p>
                    </div>
                </div>
            </div>
           
        </div>
        <!--成为我们的合作伙伴 结束-->
        
        <!--友情链接 开始-->
        <!-- <div class="w1000 friendlyLink">
            <p class="link">友情链接</p>
            <div class="clearfix">
                <img src="./images/friendlyIcon1.png" alt="" class="linkPic">
            </div>
        </div> -->
        <div>
            <div class="partTwoTit">
                <h2 class="bigTitle">如何入驻平台</h2>
                <img class='img_title' src="./images/img_title.png" alt="" />
            </div>
            <div class="settled">
                <div class="sett_steps">
                    <img src="./images/img_01.png" alt="">
                    <h3>注册认证</h3>
                    <p>登陆中国旅游服务平台<br>填写企业资料，申请注册</p>
                </div>
                <img class='img_arrow' src="./images/img_arrow.png" alt="">
                <div class="sett_steps">
                    <img src="./images/img_02.png" alt="">
                    <h3>登录入驻</h3>
                    <p>工作人员审核通过<br>登录中国旅游服务平台</p>
                </div>
                <img class='img_arrow' src="./images/img_arrow.png" alt="">
                <div class="sett_steps">
                     <img src="./images/img_03.png" alt="">
                    <h3>平台使用</h3>
                    <p>开始使用中国旅游服务平台<br>为客户定制行程</p>
                </div>
            </div>
            
        </div>
        <!--友情链接 结束-->
        <!--免费入驻 开始-->
        <div class="linkBtn">
            <router-link :to="{name:'register'}" class="freeEnter">立即申请免费使用</router-link>
        </div>
        <div>
             <div class="partTwoTit">
                <h2 class="bigTitle">新闻媒体报导</h2>
                <img class='img_title' src="./images/img_title.png" alt="" />
            </div>
            <div class="media">
                <div class="img_top">
                    <img class='img1' src="./images/img_img1.png" alt="">
                    <img class='img2' src="./images/img_img2.png" alt="">
                    <img class='img3' src="./images/img_img3.png" alt="">
                </div>
                <div class="img_bot">
                    <img class='img4' src="./images/img_img4.png" alt="">
                    <img class='img5' src="./images/img_img5.png" alt="">
                    <img class='img6' src="./images/img_img6.png" alt="">
                    <img class='img7' src="./images/img_img7.png" alt="">
                </div>
            </div>
        </div>
        <!--免费入驻 结束-->
        <public-foot></public-foot>
        
    </div>
</template>
<script>
import Head from "@/components/head";
import Foot from "@/components/foot";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "login",
  computed: {
    ...mapGetters(["isLogin", "member"])
  },
  components: {
    publicHead: Head,
    publicFoot: Foot
  },
  created() {
    this.check("ptUser");
  },
  data() {
    return {
      errMeg: "",
      userInfo: "",
      pswdInfo: "",
      controlErrMeg: false,
      remember: ""
    };
  },
  watch: {
    /* pswdInfo(a) {
      if (a && a.length > 5) {
        this.$refs["submit"].focus();
      }
    } */
  },
  methods: {
    callGoLogin() {
      this.goLogin();
    },
    //登录按钮 /* 用户不能为空，密码不能为空，密码大于6位数 */
    goLogin: function() {
        //console.log('111111111111')
      if (!this.userInfo) {
        this.prompt("请先输入用户名或邮箱");
        return false;
      } else if (!this.pswdInfo) {
        this.prompt("请先输入密码");
        return false;
      } else if (this.pswdInfo && this.pswdInfo.length < 6) {
        //密码是否够六位数
        this.prompt("密码至少6位数");
        return false;
      } else if (this.pswdInfo && this.userInfo) {
        let params = {
          name: this.userInfo,
          password: this.pswdInfo,
          loginStatus:0
        };
        if (remember) {
          this.set("ptUser", this.userInfo, 30);
        }
        this.$store.dispatch("accountLogin", params).then(res => {
          if (res) {
            this.$router.push({ name: "manage" });
          } else {
            this.prompt("密码错误");
            return false;
          }
        });
      }
      return false;
    },
    //错误提示
    prompt: function(msg) {
      this.controlErrMeg = true;
      this.errMeg = msg;
      let self = this;
      setTimeout(function() {
        self.controlErrMeg = !self.controlErrMeg;
        self.errMeg = "";
      }, 3000);
    },
    //设置cookies ptUser
    set: function(c_name, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        c_name +
        "=" +
        escape(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    },
    //获取cookie值 ptUser
    get: function(c_name) {
      if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          let c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) c_end = document.cookie.length;
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
      return "";
    },
    //检测cookie 是否有 ptUser
    check: function(name) {
      var userInfo = this.get(name);
      if (userInfo != null && userInfo != "") {
        this.userInfo = userInfo;
      } else {
        this.set(name, tel, 30);
        if (tel != null && tel != "") {
          this.set(name, tel, 30);
        }
      }
    }
  }
};
</script>
<style scoped>
@import "./login.css";
</style>
