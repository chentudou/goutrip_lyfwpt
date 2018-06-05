<template>
<!--     <transition name="dayItemUp">  --> 
  <div class="dayItemWrap" key="dropDown" :class="dayItemWidth ? 'w27' : 'w10'">
    <popover ref="popRegionUse" placement="top" width="205" :value="popRegionUse" :visible-arrow="false"
        content="这里是日期区域，可修改、拖拽日期" popper-class="popover"></popover>

    <popover ref="popUpdataTripDate" placement="bottom" width="150" :value="popUpdataTripDate" :visible-arrow="true"
        content="点击即可修改行程日期" popper-class="popover"></popover>

    <popover ref="popUpdataTripDay" placement="bottom" width="150" :value="popUpdataTripDay" :visible-arrow="true"
        content="点击即可修改行程天数" popper-class="popover"></popover>

    <popover ref="popTrimDate" placement="bottom" width="250" :value="popTrimDate" :visible-arrow="true"
        content="拖拽即可调整顺序，右侧景点也是哦" popper-class="popover"></popover>

            <happy-scroll  resize size="2" color="rgba(51,51,51,0.2)">
                <draggable :style="'height: ' + height + 'px;'"
                    v-model="dateList"
                    :forceFallback="true"
                    @end="dragEvent"
                    :options="{ dragClass:'drag', ghostClass: 'ghost',animation:300}"
                    class="itemWrap">
                    <div :class="[ 'item', { dayItemActive: index === dayItemIndex }]"
                        v-for="(item, index) in dateList"
                        @click="drItemClick(index)"
                        :key="index">
                        <div class="dayNumber fl">D{{ index + 1 }}</div>
                        <div class="fl dayInner" v-if="index==0"  v-popover:popRegionUse>
                            <!-- <p class="dayTime" v-popover:popUpdataTripDate>{{ item.dayTime | fromatDate  }}</p> -->
                            <!-- <input class="dayTime" type="text" :value="item.dayTime | fromatDate"> -->
                            <!-- <el-date-picker class="dayTime"
                              v-model="firstOfTravelTime"  
                              type="date"
                              placeholder="选择日期">
                            </el-date-picker> -->
                            <el-date-picker class="dayTime" :clearable="false" :editable="false" :picker-options="pickerOptions"
                              v-model="everyTime[index]"   size="mini"
                              type="date"
                              :placeholder="item.dayTime | fromatDate">
                            </el-date-picker>
                            <input v-if="index&&index!=dateList.length-1" class="dayAddress" type="text" readonly placeholder="请添加城市" v-model="item.traveldayName">
                            <p class="dayAddress" v-else-if="!index&&index!=dateList.length-1">{{goBack.goCity}}>{{ item.traveldayName }}</p> 
                            <p class="dayAddress" v-else-if="index&&index==dateList.length-1">{{ item.traveldayName }}>{{goBack.backCity}}</p> 
                        </div>
                        <div class="fl dayInner" v-else-if="index==2" v-popover:popTrimDate>
                            <!-- <p class="dayTime">{{ item.dayTime | fromatDate  }}</p> -->
                            <el-date-picker class="dayTime" :clearable="false" :editable="false" :picker-options="pickerOptions"
                              v-model="everyTime[index]"  size="small"
                              type="date"
                              :placeholder="item.dayTime | fromatDate">
                            </el-date-picker>
                            <input v-if="index&&index!=dateList.length-1" class="dayAddress" type="text" readonly placeholder="请添加城市" v-model="item.traveldayName">
                            <p class="dayAddress" v-else-if="!index&&index!=dateList.length-1">{{goBack.goCity}}>{{ item.traveldayName }}</p> 
                            <p class="dayAddress" v-else-if="index&&index==dateList.length-1">{{ item.traveldayName }}>{{goBack.backCity}}</p> 
                        </div>
                        <div class="fl dayInner" v-else>
                            <!-- <p class="dayTime">{{ item.dayTime | fromatDate  }}</p> -->
                            <el-date-picker class="dayTime" :clearable="false" :editable="false" :picker-options="pickerOptions"
                              v-model="everyTime[index]" size="small"
                              type="date"
                              :placeholder="item.dayTime | fromatDate">
                            </el-date-picker>
                            <input v-if="index&&index!=dateList.length-1" class="dayAddress" type="text" readonly placeholder="请添加城市" v-model="item.traveldayName">
                            <p class="dayAddress" v-else-if="!index&&index!=dateList.length-1">{{goBack.goCity}}>{{ item.traveldayName }}</p> 
                            <p class="dayAddress" v-else-if="index&&index==dateList.length-1">{{ item.traveldayName }}>{{goBack.backCity}}</p> 
                        </div>
                        <dropdown  v-if="index==2" v-popover:popUpdataTripDay
                            class="fr"
                            :trigger="'click'"
                            :show-timeout="0"
                            :hide-timeout="0"
                            :placement="'bottom-start'"
                            @command="dropdownItemClick">
                            <div class="more dropdown-link"></div>
                            <dropdown-menu slot="dropdown">
                                <dropdown-item v-if="index" :command="{ num: index, idx: 0, dateId:item.id }">之前插入一天</dropdown-item>
                                <dropdown-item v-if="index!=dateList.length-1" :command="{ num: index, idx: 1, dateId:item.id }">之后插入一天</dropdown-item>
                                <dropdown-item v-if="index&&index!=dateList.length-1" :command="{ num: index, idx: 2, dateId:item.id }">删除该日</dropdown-item>
                            </dropdown-menu>
                        </dropdown>
                        <dropdown  v-if="index!=2"
                            class="fr"
                            :trigger="'click'"
                            :show-timeout="0"
                            :hide-timeout="0"
                            :placement="'bottom-start'"
                            @command="dropdownItemClick">
                            <div class="more dropdown-link"></div>
                            <dropdown-menu slot="dropdown">
                                <dropdown-item v-if="index" :command="{ num: index, idx: 0, dateId:item.id }">之前插入一天</dropdown-item>
                                <dropdown-item v-if="index!=dateList.length-1" :command="{ num: index, idx: 1, dateId:item.id }">之后插入一天</dropdown-item>
                                <dropdown-item v-if="index&&index!=dateList.length-1" :command="{ num: index, idx: 2, dateId:item.id }">删除该日</dropdown-item>
                            </dropdown-menu>
                        </dropdown>
                    </div>
                </draggable>
            </happy-scroll>
            <div class="dayItemToUp dayItemArrow" @click.stop="dayItemToUp"></div>
  </div>
        <!-- <div class="dayItemPublic dayItemUpDoc" v-if="!dayItemShow" key="dropUp">
            <div class="dayItemUpDocText"><span>D{{ dayItemIndex + 1 }}</span>　{{ dateList[dayItemIndex].address }}</div>
            <div class="dayItemToPublic dayItemToDown" @click.stop="dayItemToUp"></div>
        </div> -->
<!--     </transition>-->
 </template>
<script>
import draggable from "vuedraggable";
import {
  Dropdown,
  DatePicker,
  DropdownItem,
  DropdownMenu,
  Message,
  Loading,
  popover
} from "element-ui";
import { HappyScroll } from "vue-happy-scroll";
import "vue-happy-scroll/docs/happy-scroll.css";
import { mapGetters } from "vuex";
import api from "@/handler/tranfer";
import designSizeDate from "@/handler/designSizeDate";
import fromatDate from "@/handler/fromatDate";
import insertInfo from "@/handler/insertInfo";
export default {
  computed: {
    ...mapGetters([
      "travelId",
      "currentInfo",
      "addCurrentInfo",
      "popoverEvery"
    ]),
    dateListLength: function() {
      return this.dateList.length - 1;
    }
  },
  data() {
    return {
      msg: "左侧的天数",
      dayItemIndex: 0,
      dayItemWidth: true,
      dateList: [],
      noCity: "请添加城市",
      loadingInstance: null,
      firstOfTravelTime: "",
      fristTime: "", //首日
      goBack: {},
      currentRow: 1,
      popRegionUse: false,
      popUpdataTripDate: false,
      popUpdataTripDay: false,
      popTrimDate: false,
      everyTime: [],
      pickerOptions:{
        disabledDate(time){
          return time.getTime() < Date.now() - 8.64e7
        }
      },
    };
  },
  watch: {
    // 监听中间的列表和地图之间的切换，
    toUpActive(val) {
      if (val === 1) {
        this.dayItemShow = true;
      }
    },
    /* 中间部分的头部城市信息的变动---要实时的更新对应的日期的城市变化 */
    currentInfo: {
      handler(a, b) {
        //console.log("currentInfo---",a);
        this.dateList[a.currentIndex - 1].traveldayName = a.tripCityName.join(
          ">"
        );
        this.dateList[a.currentIndex - 1].traveldayIds = a.tripCityId.join(",");
        this.$set(
          this.dateList,
          a.currentIndex - 1,
          this.dateList[a.currentIndex - 1]
        );
      },
      deep: true
    },
    /* 根据出发首日日期和列表的长度，计算出左侧列表的所有日期列表 */
    firstOfTravelTime(a, b) {
      let c = designSizeDate(this.firstOfTravelTime, this.dateList.length);
      this.everyTime = c;
      //console.log("res.item.travel.travelTime", a, c);
      for (let i = 0; i < c.length; i++) {
        this.dateList[i].dayTime = c[i];
      }
    },
    popoverEvery(a, b) {
      let val = `pop${a.val}`;
      if (!this[val]) {
        this[val] = !this[val];
        setTimeout(() => {
          this[val] = !this[val];
        }, 4000);
      }
    },
    everyTime(a, b) {
      a.filter((item, idx) => {
        if (typeof item === "object") {
          //console.log(idx, Date.parse(item));
          let utc = 24 * 60 * 60 * 1000 * idx; /* 修改的日期与第一天的时间差 */
          this.everyTime = designSizeDate(Date.parse(item) - utc, a.length);
          let params={
            travelId:this.travelId,
            travelTime:fromatDate(this.everyTime[0],0),
            backtravelTime:fromatDate(this.everyTime[this.everyTime.length-1],0),
          }
          console.log(params)
          this.updateTripTime(params);
        }
      });
    }
  },
  created() {
    /* 进入页面时，获取左侧时间列表 */
    this.$_fetchData();
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    // 中间部分是列表还是地图的变量
    toUpActive: {
      type: Number,
      default: 0
    }
  },

  methods: {
    // 点击每一天的时候切换到这一天
    drItemClick(index) {
      this.dayItemIndex = index;
      this.renewCurrentInfo(index); //更新当前时间信息
    },
    // 拖动结束后执行的函数
    dragEvent(e) {
      this.dateSort();
      let params = {
        startId: this.dateList[e.newIndex].id,
        endId: this.dateList[e.newIndex - 0 + 1]
          ? this.dateList[e.newIndex - 0 + 1].id
          : 0
      };
      /* 拖动后，oldIndex，newIndex变化时，通知后台重新排序 */
      if (e.oldIndex != e.newIndex) {
        api.post("/trip/edit/sortTripDate", params).then(res => {
          if ((res.rescode = "200")) {
            this.renewCurrentInfo(this.dayItemIndex);
          }
        });
      }
    },
    // 点击更多出现的下拉框，2==删除，1=之后插入，0=之前插入
    dropdownItemClick(item) {
      const n = item.num; // 点击当前日期的下标
      //console.log('点击当前日期的下标',n)
      const i = item.idx; // 弹出层的下标  2==删除，1=之后插入，0=之前插入
      const id = item.dateId; // 弹出层的下标  2==删除，1=之后插入，0=之前插入
      if (i === 0) {
        let loadingInstance = Loading.service({
          target: document.querySelector(".dayItemWrap")
        });
        let params = {
          type: 1,
          id: id
        };
        //console.log("之前添加一天", params);
        api.post("/trip/edit/insertTripDay", params).then(res => {
          //console.log("res", item.id);
          if (res.rescode == "200") {
            let data = {
              id: res.item.id
            };
            insertInfo(this.dateList, 0, n, data);
            this.renewCurrentInfo(n);
            this.dateSort(loadingInstance);
          }
        });
      } else if (i === 1) {
        let loadingInstance = Loading.service({
          target: document.querySelector(".dayItemWrap")
        });
        //console.log("之后添加一天");
        let params = {
          type: 2,
          id: id
        };
        api.post("/trip/edit/insertTripDay", params).then(res => {
          if (res.rescode == "200") {
            /* 给数组指定位置插入信息 */
            let item = {
              id: res.item.id
            };
            insertInfo(this.dateList, 1, n - 0 + 1, item);
            this.renewCurrentInfo(n);
            this.dateSort(loadingInstance);
          }
        });
      } else if (i === 2) {
        if (this.dateList.length > 2) {
          let loadingInstance = Loading.service({
            target: document.querySelector(".dayItemWrap")
          });
          let params = {
            dayId: id
          };
          api.post("/trip/edit/delTripDay", params).then(res => {
            if (res.rescode == "200") {
              this.dateList.splice(n, 1);
              this.renewCurrentInfo(n);
              this.dateSort(loadingInstance);
            }
          });
        } else {
          Message({
            type: "success",
            message: "游玩天数不能小于2"
          });
        }
      }
    },
    // 点击收起的按钮收起左侧列表
    dayItemToUp() {
      this.dayItemWidth = !this.dayItemWidth;
      setTimeout(() => {
        if (!this.dayItemWidth) {
          this.$store.dispatch("mapWidth", 1);
        } else {
          this.$store.dispatch("mapWidth", 0);
        }
      }, 600);
    },
    /* 初始化请求数据 */
    $_fetchData() {
      let params = {
        travelId: this.travelId
      };
      api.post("/trip/edit/getDateList", params).then(res => {
        //console.log("left--getDateList", res);
        /* 获取当前行程下的出发日期 */
        this.firstOfTravelTime = res.item.travel.travelTime;
        // console.log('res.item.travel.travelTime',res.item.travel.travelTime)
        this.goBack = {
          goCity: res.item.travel.goCity,
          backCity: res.item.travel.backCity
        };
        this.dateList = res.item.customDayList.map((item, idx, arr) => {
          if (!/[\u4e00-\u9fa5]/.test(item.traveldayName)) {
            item.traveldayName = "";
          }
          //console.log('item',item)
          return item;
        });
        this.renewCurrentInfo(0, res.item.travel.travelTime);
        let tripInfo = {
          adultNum: res.item.travel.adultNum,
          childrenNum: res.item.travel.childrenNum,
          travelName: res.item.travel.travelName,
          remarks: res.item.travel.remarks
        };
        this.$store.dispatch("tripInfo", tripInfo);
      });
    },
    /* 日期重新排序 */
    dateSort(loadingInstance) {
      let a = designSizeDate(this.firstOfTravelTime, this.dateList.length);
      for (let i = 0; i < this.dateList.length; i++) {
        this.dateList[i].dayTime = a[i];
        this.$set(this.dateList, i, this.dateList[i]);
      }
      if (loadingInstance) {
        loadingInstance.close();
        Message({
          type: "success",
          message: "操作成功"
        });
      } else {
        return 1;
      }
    },
    /* vuex实时更新 currentInfo */
    renewCurrentInfo(i, initTime) {
      let info = {
        tripCityName: this.dateList[i].traveldayName,
        tripCityId: this.dateList[i].traveldayIds,
        dayId: this.dateList[i].id,
        dayTime: this.dateList[i].dayTime ? this.dateList[i].dayTime : initTime,
        currentIndex: i - 0 + 1
      };
      this.$store.dispatch("currentInfo", info);
    },
    updateTripTime(params) {
      api.post("/trip/edit/updateTripTime",params).then(res => {
        res
          ? Message({
            type: "success",
              type: "success",
              message: '修改成功'
            })
          : Message({
              type: "error",
              message: "修改失败"
            });
      });
    }
  },
  components: {
    HappyScroll,
    draggable,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Message,
    Loading,
    popover,
    elDatePicker: DatePicker
  }
};
</script>
<style scoped lang="scss">
@import "../../../../assets/css/color.scss";
//@import "left.scss";
.dayItemWrap {
  .item {
    width: 100%;
    height: 80px;
    padding-left: 30px;
    padding-right: 32px;
    padding-top: 12px;
    overflow: hidden;
    background: #fff;
    cursor: all-scroll;
    .dayNumber {
      width: 34px;
      text-align: center;
      line-height: 32px;
      font-size: 14px;
      border: 1px solid $_colorMain;
      border-radius: 50%;
      color: $_colorMain;
      background: $_fontf;
      margin-right: 15px;
      margin-top: 13px;
    }
    .dayTime {
      font-size: 14px;
      display: inline;
    }
    .dayInner {
      width: 62%;
      transition: display 0.5s;
    }
    .dayAddress {
      font-size: 14px;
      width: 90%;
      cursor: pointer;
      height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background: transparent;
    }
    .noCity {
      color: #999;
      cursor: pointer;
    }
    .more {
      transition: display 0.5s;
      width: 14px;
      height: 14px;
      background: url("../images/icon_more.png") center no-repeat;
      background-size: 100% 100%;
      margin-top: 22px;
      cursor: pointer;
    }
  }
  // 选中的样式
  .dayItemActive {
    background: $_bacgroundM !important;
    .dayNumber {
      background: $_colorMain;
      color: $_fontf;
    }
  }
}
.dayItemArrow {
  background-color: $_colorMain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateX(45%) rotate(-90deg);
}
.dayItemToUp {
  width: 34px;
  height: 34px;
  // transform: translateX(46%);
  background-image: url("../images/icon_arrowTop_fff.png");
  background-size: 16px 10px;
  transition: transform 0.2s;
}
.dayItemToDown {
  width: 30px;
  height: 30px;
  right: 10px;
  background-image: url("../images/icon_arrowBottom_fff.png");
  background-size: 10px 7px;
}
//列表收起的时候样式
.dayItemUpDoc {
  height: 50px;
  border-bottom: 2px solid $_colorMain;
  .dayItemUpDocText {
    position: absolute;
    font-size: 14px;
    color: $_fond3;
    top: 50%;
    left: 50%;
    transform: translate(-90%, -50%);
    span {
      color: $_colorMain;
    }
  }
}
.w10.dayItemWrap {
  width: 7.3485%;
  background: #fff;
}
.w10 .item {
  position: relative;
}
.w10 .dayNumber {
  position: absolute;
  left: 50%;
  margin-left: -20px;
}
.w10 .dayInner,
.w10 .more {
  display: none;
}
.w27 .dayInner,
.w27 .more {
  display: block;
}
.w10 .dayItemArrow {
  transform: translateX(45%) rotate(90deg);
}
.item:hover {
  background: #f9f9f9;
}
.drag {
  opacity: 0;
}
.itemWrap {
  background: #fff;
}
</style>
<style>
.dayTime input {
  height: 100%;   
  border: 0;
  background: transparent;
  padding-left: 0;
}
input.el-input__inner {
  color: #333;cursor: pointer;
}
.dayTime .el-input__inner {
  padding-left: 0; width: 75px;
  padding-right: 0;
}
.dayTime .el-icon-date:before {
  content: "";
}
</style>

