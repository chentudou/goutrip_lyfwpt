<template>
    <div class="myTrip clearfix">
        <div class="componHead clearfix">
            <span class="fl componName">我的行程 <i class="myTripNum">{{itemInfo.totalRow}}</i></span>
            <span @click="disclaimer = true" class="fr creatTripBtn">创建行程</span>
        </div>
        <div class="tripContent">
            <ul v-if="isData" class="tripInner clearfix">
                <li class="tripItem fl" v-for="(item,idx) in response" :key="idx">
                    <div class="bookImg">
                        <img v-if="item.url" :src="item.url" alt="">
                        <img v-else src="../images/bookDefault.png" alt="">
                        <i class="bookSpine"></i>
                    </div>
                    <div class="bookInfo">
                        <p class="bookTitle">{{item.travelName}}</p>
                        <p class="dateNumber">
                            <span class="bookDate">{{item.travelTime | fromatDate }}出发</span> |
                            <span class="bookNumber">共{{item.codes}}天</span>
                        </p>
                    </div>
                    <div class="hoverStutas" :class="{hoverStutas_1:item.templateStatus}">
                        <router-link v-if="!item.templateStatus" class="goEdit" :to="{name:'tripEdit',params:{id:item.id}}">编辑</router-link>
                        <!-- <router-link v-else class="goEdit" :to="{name:'tripEdit',params:{id:item.id}}">编辑</router-link> -->
                        <span class="goPreview" @click="goPreview(item.id)">预览</span>
                        <p class="iconInner clearfix">
                            <!-- <span class="fl bookShape" @click="tripShape"></span> -->
                            <span v-if="!item.templateStatus" class="fl bookCopy" @click="tripCopy(item.id)"></span>
                            <span class="fl bookdel" @click="tripDel(item.id)"></span>
                        </p>
                    </div>
                </li>
            </ul>
            <div v-else class="noThing">您还没有创建过行程，点击开始制作吧！</div>
        </div>
        <div class="block" v-if="itemInfo.totalRow>8">
          <div class="pagination"> 
            <el-pagination background
            @current-change="currentChange"
            
            :page-size="itemInfo.pageRow"
            layout="total, prev, pager, next, jumper"
            :total="itemInfo.totalRow">
          </el-pagination>
          </div>
          
      </div> 
        <el-dialog title="创建新行程" :visible.sync="disclaimer" width='935px' center>
            <creat-trip @listenChild="childMsg"></creat-trip>
        </el-dialog>
    </div>
</template>
<script>
import { Dialog, Pagination, MessageBox, Message } from "element-ui";
import creatTrip from "@/components/creatTrip";
import api from "@/handler/tranfer";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "newTripStatus",
      "copyTripStatus",
      "delTripStatus",
      "jumpNum"
    ]),
  },
  components: {
    elDialog: Dialog,
    elPagination: Pagination,
    creatTrip,
    MessageBox,
    Message
  },
  data() {
    return {
      disclaimer: false,
      response: "",
      itemInfo: {},
      isData:true
    };
  },
  watch: {
    /* 新建行程的状态 */
    newTripStatus(a, b) {
      if (a.val == "200") {
        this.$_fetchData();
      }
    },
    /* 复制行程的状态 */
    copyTripStatus(a, b) {
      if (a.val == "200") {
        this.$_fetchData();
      }
    },
    /* 删除行程的状态 */
    delTripStatus(a, b) {
      if (a.val == "200") {
        this.$_fetchData();
      }
    }
  },
  created() {
    if (this.jumpNum && this.jumpNum > 1) {
      let params = {
        page: this.jumpNum
      };
      this.currentChange(this.jumpNum);
    } else {
      this.$_fetchData();
    }
    this.resetStatus();
  },
  methods: {
    $_fetchData(params) {
      //console.log(params)
      api.get("/manage/travelList", params).then(res => {
        //console.log('/manage/travelList',res)
        if(res&&res.rescode){
          this.response = res.items;
          this.response?this.isData=true:this.isData=false;
          this.itemInfo = res.item;
        }
      });
    },
    /* 翻页 */
    currentChange(val) {
      let params = {
        page: val
      };
      this.$_fetchData(params);
      this.$store.dispatch("jumpNum", val);
    },
    /* 弹出框的添加后重新获取数据 */
    childMsg(val) {
      if (val == "200") {
        this.disclaimer = false;
        this.$_fetchData();
      }
    },
    /* 删除行程 */
    tripDel(id) {
      MessageBox.confirm("此操作将删除该行程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          api.post("/manage/delTrip", { travelId: id }).then(res => {
            if (res.rescode == "200") {
              Message({
                type: "success",
                message: "删除成功!"
              });
              this.$store.dispatch("delTripStatus", res.rescode);
            } else {
              Message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /* 复制行程 */
    tripCopy(id) {
      var copyNum = 0;
      console.log(id)
      if (copyNum == 0) {
            api.post("/manage/copyTrip", { travelId: id }).then(res => {
              console.log(res)
              if (res.rescode == "200") {
                ++copyNum
                Message({
                  type: "success",
                  message: "复制成功!"
                });
                this.$store.dispatch("copyTripStatus", res.rescode);
              } else {
                Message({
                  type: "error",
                  message: "复制失败!"
                });
              }
            });
          } else {
            Message({
              type: "error",
              message: "您已复制成功!"
            });
          }
    },
    /* 分享行程 */
    tripShape() {},
    /* 刷新页面重置各种状态 */
    resetStatus() {
      this.$store.dispatch("copyTripStatus", 0);
      this.$store.dispatch("delTripStatus", 0);
    },
    /* 跳转到预览 */
    goPreview(id){
      /* window.open('http://114.112.69.204:8061/book/index?travelId='+id) */
      window.open('http://192.168.10.113:8061/book/index?travelId='+id)
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../assets/css/color.scss";
.myTrip {
  margin-top: 30px;
  background-color: $_fontf;
  clear: both;
  margin-left: 8%;
}
.componHead {
  width: 100%;
}
.componName {
  font-size: 18px;
  color: $_fond6;
  padding-top: 10px;
}
.myTripNum {
  font-size: 18px;
  color: $_fond9;
}
.creatTripBtn {
  width: 140px;
  text-align: center;
  height: 44px;
  line-height: 44px;
  border-radius: 3px;
  color: #fff;
  background-color: rgba(253, 150, 0, 1);
  background-image: url("../images/creatTrip.png");
  background-repeat: no-repeat;
  background-position: 20px 50%;
  padding-left: 30px;
  cursor: pointer;
}
/* 书本样式 */
.tripItem {
  width: 22.179%;
  height: 350px;
  box-shadow: 4px 3px 10px 3px #ddd;
  position: relative;
  margin-right: 3.75%;
  margin-bottom: 30px;
  transition: display 0.4s;
}
.bookImg {
  position: relative;
  height: 62%;
}
.bookImg img {
  width: 100%;
  height: 100%;
}
.bookSpine {
  background-image: url("../images/bookSpine.png");
  position: absolute;
  width: 25px;
  height: 104%;
  display: inline-block;
  z-index: 999;
  background-size: 129%;
  top: -9.5px;
  left: -13px;
}
.bookInfo {
  background-color: #fff;
  padding: 21px 0 35px 21px;
  height: 38%;
  box-shadow: -2px 0px 0px 0px #eee;
  -webkit-box-shadow: -2px 0px 0px 0px #eee;
  -ms-box-shadow: -2px 0px 0px 0px #eee;
  -moz-box-shadow: -2px 0px 0px 0px #eee;
}
.bookTitle {
  color: $_fond3;
  font-size: 16px;
  padding-bottom: 12px;
  display: block;
  width: 160px;
  height: 33px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dateNumber {
  color: $_fond9;
  font-size: 14px;
}
.tripContent {
  margin-top: 12px;
}

.hoverStutas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.75s;
  -moz-transition: opacity 0.75s;
  -webkit-transition: opacity 0.75s;
  -ms-transition: opacity 0.75s;
  text-align: center;
}
.tripItem:hover .hoverStutas {
  opacity: 1;
}
.tripItem:hover .bookSpine {
  opacity: 0;
}
.goEdit,
.goPreview {
  width: 140px;cursor: pointer;
  height: 32px;
  border-radius: 5px;
  border: 1px solid #fff;
  text-align: center;
  line-height: 30px;
  color: #fff;
  font-size: 14px;
  display: block;
  margin: 0 auto;
  transition: background-color 0.75s, color 0.75s;
  -webkit-transition: background-color 0.75s, color 0.75s;
  -moz-transition: background-color 0.75s, color 0.75s;
  -ms-transition: background-color 0.75s, color 0.75s;
}
.hoverStutas {
  padding-top: 30%; 
}
.hoverStutas_1{
  padding-top: 40%;
}
.goEdit{
margin-bottom: 10%;
}
.goEdit:hover,
.goPreview:hover {
  background-color: #fff;
  color: $_fond3;
}
.iconInner {
  margin-top: 35%;
  display: inline-block;
}
.iconInner span {
  width: 19px;
  cursor: pointer;
  height: 19px;
  margin-right: 25px;
  background-repeat: no-repeat;
  background-size: 16px;
}
.iconInner span:last-child {
  margin-right: 0;
}
.bookShape {
  background-image: url("../images/bookShape.png");
}
.bookCopy {
  background-image: url("../images/bookCopy.png");
}
.bookCopy:hover{
  background-image: url("../images/bookCopyYellow.png");
}
.bookdel {
  background-image: url("../images/bookDel.png");
}
.bookdel:hover {
  background-image: url("../images/bookDelYellow.png");
}
.noThing {
  background: url("../images/point.png") no-repeat;
  width: 100%;
  height: 150px;
  text-align: center;
  line-height: 18;
  background-size: 25% 85%;
  background-position: 90%;
  margin: 25px;
  font-size: 18px;
  color: $_fond6;
}
.block {
  margin: 40px auto 0;
  text-align: center;
}
.pagination {
  display: inline-block;
}
.tripItem:nth-child(4n) {
  margin-right: 0;
}
@media screen and (max-width:1560px) {
  .tripItem {
    height: 297.2px;
  }
  .bookSpine {
    top: -7px;
    left: -12px;
    background-size: 109%;
  }
}
@media screen and (max-width: 1330px) {
  .tripItem {
    height: 283px;
  }
  .bookSpine {
    top: -7px;
    left: -12px;
    background-size: 105%;
  }
}
@media screen and (max-width: 1280px) {
  .tripItem {
    height: 258px;
  }
  .bookSpine {
    top: -7px;
    left: -12px;
    background-size: 105%;
  }
}
</style>