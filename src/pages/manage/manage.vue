<template>
    <div class="manage clearfix" :style="{'height':winH+'px'}">
        <div class="aside fl" id="aside">
            <img src="./images/sideLogo.png" alt="" class="sideLogo">
            <div class="userInfo">
                <img class="headImg" :src="logoImg" alt="">
                <span class="companyName">{{companyName}}</span>
            </div>
            <ul class="manageItem">
                <li v-for="(item,idx) in currPart" @click="toggleItem(idx)" :class="{current:currItem==idx}" :key="item.id">
                    <router-link :to="{name:item.compon}">
                      <span :class="item.compon">{{item.name}}</span>
                    </router-link>
                </li>
            </ul>            
        </div>
        <div class="main fl" :style="{'width':mainW+'px'}">
            <transition name="slide">
                <keep-alive>
                    <router-view v-if="$route.meta.KeepAlive"></router-view>
                </keep-alive>
            </transition>
            <transition name="fade">
                <router-view v-if="!$route.meta.KeepAlive"></router-view> 
            </transition>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters(["member", "isLogin","newTripStatus"])
  },
  data() {
    return {
      winH: "",
      mainW: "",
      asideW: "",
      logoImg: "",
      companyName: "",
      currItem: "",
      currPart: [
        { name: "创建行程", compon: "creatTrip" },
        { name: "我的行程", compon: "myTrip" },
        { name: "设置", compon: "manageSet" }
      ]
    };
  },
  created() {
    //console.log("jinlaile", this.isLogin, this.member, window.location.hash);
    this.currItem = this.currPage(window.location.hash);
  },
  mounted() {
    this.setHeight();
    (this.logoImg =
      this.isLogin && this.member ? this.member.logoImg : this.member.logoImg),
      (this.companyName =
        this.isLogin && this.member
          ? this.member.companyName
          : this.member.companyName);
  },
  watch: {
    member() {
      //console.log("watch", this.member);
      (this.logoImg = this.member.logoImg),
        (this.companyName = this.member.companyName);
    },
    newTripStatus(a, b) {
      if (a.val == "200") {
        this.toggleItem(1);
      }
    }
  },
  methods: {
    setHeight: function() {
      this.winH = window.innerHeight;
    },
    toggleItem(i) {
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
    }
  }
};
</script>

<style scoped>
.manage {
  width: 100%;
}
.aside {
  background-color: #3d4756;
  width: 320px;
  height: 100%;
}
.main {
  background-color: #fff;
  width: 1240px;
}
@media screen and (max-width: 1560px) {
  .aside {
    width: 290px;
  }
  .main {
    width: 1040px;
  }
}
@media screen and (max-width: 1330px) {
  .aside {
    width: 256px;
  }
  .main {
    width: 990px;
  }
}
@media screen and (max-width: 1260px) {
  .main {
    width: 900px;
  }
  .aside {
    width: 222px;
  }
}
input {
  border: 0 !important;
}
/* 侧边信息 */
.sideLogo {
  margin: 17px auto 30px;
}
.headImg {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #fff;
  margin: 0 auto 21px;
}
.userInfo {
  text-align: center;
}
.companyName {
  font-size: 14px;
  color: #999;
}
.manageItem {
  margin-top: 50px;
}
.manageItem li {
  width: 100%;
  height: 60px;
  line-height: 60px;
}
.manageItem li:hover {
  background: #fd9600;
}
.manageItem li a{
  text-align: center;
}
.manageItem li span {
  font-size: 14px;
  color: #fff;
  background-repeat: no-repeat;
  background-size: 14px;
  width: 90px;
  margin: 0 auto;
  background-position: 0 50%;
  padding-left: 32px;
      display: inline-block;
    text-align: left;
}
.creatTrip {
  background-image: url("./images/creatTrip.png");
}
.myTrip {
  background-image: url("./images/myTrip.png");
}
.memberManage {
  background-image: url("./images/memberManage.png");
}
.manageSet {
  background-image: url("./images/manageSet.png");
}
.current {
  background: #fd9600;
}
</style>
