<template>
  <div class="manageSet">
    <p class="manageSetTitle">个人资料</p>
    <ul class="navList clearfix">
      <li class="fl" v-for="(item,idx) in currPart" @click="toggleItem(idx)" :class="{current:idx==currItem}" :key="item.id" v-if="item.isShow">
          <router-link :class="item.compon" :to="{name:item.compon}">{{item.name}}</router-link>
      </li>
      <li class="fr goBack" @click="goBack">退出</li>
    </ul>
    <div class="bottomPart">
      <transition name="slide">
        <keep-alive>
          <router-view v-if="$route.meta.KeepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="slide">
        <router-view v-if="!$route.meta.KeepAlive"></router-view> 
      </transition> 
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from "@/handler/tranfer";

export default {
  computed: {
    ...mapGetters(["member"])
  },
  data() {
    return {
      currPart: [
        { name: "修改资料", compon: "update", isShow: true },
        { name: "添加子账户", compon: "subaccount", isShow: true },
        { name: "修改密码", compon: "password", isShow: true }
      ],
      currItem: 0
    };
  },
  created() {
    this.currItem = this.currPage(window.location.hash);
    this.judgeShow(this.member.parentId);
  },
  activated() {
    this.currItem = this.currPage(window.location.hash);
  },
  methods: {
    /* 切换 */
    toggleItem: function(i) {
      this.currItem = i;
    },
    currPage: function(hash) {
      let arr = hash.split("/");
      let currPageName = arr[arr.length - 1];
      let number;
      this.currPart.filter((item, idx) => {
        item.num = idx;
        if (item.compon == currPageName) {
          number = item.num;
        }
      });
      return number;
    },
    /* 根据用户登陆之后的身份信息，判断是否显示修改资料---和---添加子账户 */
    judgeShow(isMaster) {
      if (isMaster) {
        this.currPart[0].isShow = false;
        this.currPart[1].isShow = false;
        this.$router.push("/manage/manageSet/password");
        this.currItem = 2;
      }
    },
    goBack() {
      api.post("/login/userInfo", { logout: true }).then(res => {
        if (res.rescode == "200") {
          this.$store.dispatch("logout");
          console.log('55555555,page--manangeSet')
          this.$router.push("/");
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../assets/css/color.scss";
.manageSet {
  margin-left: 8%;
}
.manageSetTitle {
  margin: 44px 0 40px;font-size: 18px;color: #666;
}
.navList {
  margin-bottom: 50px;
}
.navList li {
  margin-right: 60px;
}
.navList li a {
  font-size: 16px;
  color: $_fond6;
}
li.current a {
  color: $_colorMain;
}
li.goBack{
  background-image: url('../images/goBack.png');background-size: 16px;
    font-size: 16px;
    color: #999;
    padding-left: 26px;
    width: 86px;
    background-repeat: no-repeat;
    background-position: 0 50%;
    margin-right:0;cursor: pointer;
}
li.goBack:hover{
  background-image: url('../images/goBackYellow.png');color:#FD9600;
}
</style>