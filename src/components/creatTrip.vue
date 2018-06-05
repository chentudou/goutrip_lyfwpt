<template>
    <div class="creatTripCompon">
        <div class="formInfo">
            <p class="tripName tripItem">
                <span class="itemName">行程名称</span>
                <input type="text" v-model="tripName" placeholder="请输入行程名称">
            </p>
            <div class="dateAdultChild clearfix">
                <p class="tripDate tripItem fl">
                    <span class="itemName">行程日期</span>
                    <el-date-picker v-model="tripDate" :picker-options="pickerOptions" type="daterange" :range-separator="rangSeparator" size="large" :start-placeholder="startPlaceholder" :end-placeholder="endPlaceholder" v-on:click.native="clickTime"></el-date-picker>
<!--                     <el-date-picker v-model="tripDate" :picker-options="pickerOptions" type="daterange" range-separator="-" size="large" :start-placeholder="startPlaceholder" end-placeholder="请选择返回日期"></el-date-picker>
 -->                </p>
                <p class="tripAdult tripItem fl">
                    <input type="number" min="1" v-model="tripAdult"  placeholder="成人数">
                    <span class="itemName">成人</span>
                </p>
                <p class="tripChild tripItem fl">
                    <input type="number" min="0" v-model="tripChild" placeholder="儿童数">
                    <span class="itemName">儿童</span>
                </p>
            </div>
            <div class="tripCity clearfix">
                <p class="gobackCity tripItem fl">
                    <span class="itemName">出发 / 返回城市</span>
                    <el-select v-model="fromCity" clearable  filterable @change="selectFromCity" placeholder="出发城市" @focus="queryCityInternal('from')" @blur="queryCityId('from')">
                      <el-option v-for="item in cityInternal" :key="item.id" :label="item.value" :value="item"></el-option>
                    </el-select>
                    <el-select v-show="backCityVal" clearable v-model="backCity" filterable @change="selectBackCity" placeholder="返回城市" @focus="queryCityInternal('back')" @blur="queryCityId('back')">
                      <el-option v-for="item in cityInternal" :key="item.id" :label="item.value" :value="item"></el-option>
                    </el-select>  
                </p>
                <el-button class="fl backOtherCity" @click="backOtherCity" plain>{{alikeOrDifferent}}</el-button>
            </div>
            <p class="addAddress tripItem">
                <span class="itemName">添加目的地</span>
                <el-select v-model="addressCity" clearable filterable @change="selectTripCity" placeholder="添加首个目的地" @focus="queryCityAbroad" @blur="queryCityId('address')">
                  <el-option v-for="item in cityAbroad" :key="item.id" :label="item.value" :value="item"></el-option>
                </el-select>
            </p>
            <p class="addRemarks tripItem">
                <span class="itemName">添加备注</span>
                <input type="text" placeholder="可添加行程要求" v-model="addRemarks">
            </p>
        </div>
        <el-button @click="dataSave" :plain="true" type="warning" class="saveBtn">保存</el-button>
    </div>
</template>
<script>
import { DatePicker, Button, Autocomplete, Message,Select,Option } from "element-ui";
import api from "@/handler/tranfer";

export default {
  components: {
    elDatePicker: DatePicker,
    elButton: Button,
    elOption: Option,
    elSelect : Select,
    Message
  },
  data() {
    const that =this;
    return {
      dateval: [],
      tripName: "",
      tripDate: "",
      tripAdult: "",
      tripChild: "",
      fromCity: "",
      fromCityId: "",
      backCity: "",
      backCityId: "",
      backCityVal: false,
      addressCity: "",
      addressCityId: "",
      addRemarks: "",
      cityInternal: [],
      cityAbroad: [],
      timeout: null,
      endPlaceholder:" ",
      startPlaceholder:"请选择出发日期",
      rangSeparator:" ",
      alikeOrDifferent:"返回不同城市",
      pickerOptions:{
        disabledDate(time){
          return time.getTime() < Date.now() - 8.64e7
        },
        onPick(a,b){
          that.startPlaceholder="请选择返回日期";
        }
      },
     
      
    };
  },
  watch:{
    tripDate(a,b){
      //console.log('tripDate',a,b);
      if(!a&&b){
        this.rangSeparator=" ";
        this.startPlaceholder="请选择出发日期";
      }else{
        this.rangSeparator="-";
      }
    }
  },
  methods: {
    clickTime () {
      console.log('clickTime')
    },
    backOtherCity() {
      this.backCityVal = !this.backCityVal;
      this.backCityVal?this.alikeOrDifferent="返回相同城市":this.alikeOrDifferent="返回不同城市",this.backCity ="",this.backCityId="";
    },
    dataSave() {
      //this.$router.push({name:"tripEdit",params:{id:1769}})
      if (!this.tripName) {
        Message({
          showClose: true,
          message: "行程名称不能为空",
          type: "error"
        });
        return false;
      } else if (this.tripName && this.tripName.length > 18) {
        Message({
          showClose: true,
          message: "行程名称不可超过18个文字",
          type: "error"
        });
        return false;
      } else if (!this.tripDate) {
        Message({
          showClose: true,
          message: "行程日期不能为空",
          type: "error"
        });
        return false;
      } else if (!this.tripAdult && !this.tripChild) {
        Message({
          showClose: true,
          message: "行程人数不能同时为空",
          type: "error"
        });
        return false;
      } else if (this.tripAdult < 0 || this.tripChild < 0) {
        Message({
          showClose: true,
          message: "行程人数不能小于0",
          type: "error"
        });
        return false;
      } else if (!this.fromCity) {
        Message({
          showClose: true,
          message: "出发城市不能为空",
          type: "error"
        });
        return false;
      } else if (!this.addressCity) {
        Message({ showClose: true, message: "请选择首发目的地", type: "error" });
        return false;
      } else {
        let params = {
          travelName: this.tripName,
          travelTime: this.tripDate,
          adultNum: this.tripAdult,
          childrenNum: this.tripChild, 
          goCity: this.fromCity,
          goCityId: this.fromCityId,
          backCity: this.backCity,
          backCityId: this.backCityId,
          addressCity: this.addressCity,
          addressCityId: this.addressCityId,
          remarks: this.addRemarks
        };
        this.$_fetchData(params);
        
      }
    },
    $_fetchData(params) {
      api.post("/manage/creatTrip", params).then(res => {
        if(res.rescode&&res.rescode=='200'){
         // console.log('taizo',res,params)
          Message({ showClose: true, message: "添加成功，请稍候", type: "success" });
          this.$router.push({name:"tripEdit",params:{id:res.item.id}})
          this.$emit("listenChild", res.rescode);
        }
      });
    },
    /* 查询国内城市 */
    queryCityInternal(queryString, city) {
      if (!this.cityInternal || this.cityInternal == "") {
        this.cityInternal="正在查询。。。";
        api.get("/manage/selectCityInternal").then(res => {
          var newCityInternal = [];
          if(res.items.length){
            for (var i = 0; i < res.items.length; i++) {
              if (res.items[i].regionName != undefined) {
                var pushObj = {
                  value: res.items[i].regionName,
                  id: res.items[i].regionId
                };
                newCityInternal.push(pushObj);
              }
            }
            this.cityInternal = newCityInternal;
          }
        });
      }
    },
    /* 查询国外城市 */
    queryCityAbroad(queryString, cb) {
      if (!this.cityAbroad || this.cityAbroad == "") {
        this.cityAbroad="正在查询。。。";
        api.get("/manage/selectCityAbroad").then(res => {
          var newCityAbroad = [];
          for (var i = 0; i < res.items.length; i++) {
            if (res.items[i].name != undefined) {
              var pushObj = {
                value: res.items[i].name,
                id: res.items[i].id
              };
              newCityAbroad.push(pushObj);
            }
          }
           this.cityAbroad = newCityAbroad;
        });
      } 
    },
    createStateFilter(queryString) {
      return state => {
        if (state.value) {
          return (
            state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        }
      };
    },
    queryCityId(city){
      if(!this[`${city}CityId`]||this[`${city}CityId`]==""){
        this[`${city}City`]=""
      }
    },
    selectFromCity(item) {
      this.fromCity = item.value;
      this.fromCityId = item.id;
     },
    selectBackCity(item) {
      this.backCity = item.value;
      this.backCityId = item.id;
    },
    selectTripCity(item) {
      this.addressCity = item.value;
      this.addressCityId = item.id;
    },
    formatDate(time) {
      var dd = new Date(time);
      dd.setDate(dd.getDate()); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1; //获取当前月份的日期
      var d = dd.getDate();
      //如果月份长度少于2，则前加 0 补位
      if (m.toString().length == 1) {
        m = 0 + "" + m.toString();
      } else {
        m = m.toString();
      }
      //如果天数长度少于2，则前加 0 补位
      if (d.toString().length == 1) {
        d = 0 + "" + d.toString();
      } else {
        d = d.toString();
      }
      return y + "-" + m + "-" + d;
    },
    /* 选择出发时间的回调 */
    checkStartTime(maxDate, minDate){
      this.rangSeparator="-";
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/color.scss";
.creatTripCompon {
  width: 885px;
  padding: 0 50px;
}
.componTitle {
  font-size: 18px;
  color: $_fond6;
  margin-bottom: 60px;
}
.tripName .itemName{padding-right: 58px}
.tripItem {
  border-bottom: 1px solid #ccc;
  opacity: 0.8;
  padding-bottom: 12px;
  margin-bottom: 60px;
}
.itemName {
  font-size: 14px;
  color: $_fond6;
}
.el-range-editor.el-input__inner {
  border: 0;
  padding: 0;
  height: 30px;width: 75%;
}
.creatTripCompon .el-input__inner {
  border: 0 !important;height:39px!important;
}
.creatTripCompon input {
  font-size: 14px;
  border: 0 !important;
  color: $_fond3;
}
.tripChild input,
.tripAdult input {
  width: 65%;
  height: 39px;
  text-align: center;
}
.tripDate {
  width: 61%;
  margin-right: 4.3%;
  padding-bottom: 5px;line-height: 0;
}
/* .tripDate .el-date-editor .el-range__close-icon{display:none;}
 */.tripDate input{
  float:left;
}
.tripDate input[placeholder="请选择出发日期"]{

}
.tripDate .itemName{
    float: left;
    height: 39px;
    line-height: 39px;
    padding-right: 60px;
}
.tripDate .el-date-editor .el-range-separator{
  float:left;line-height: 3;
}
.tripAdult {
  width:15.2%;
  margin-right:  4.3%;
  padding-bottom: 5px;
}
.tripChild {
  width:15.2%;
  padding-bottom: 5px;
}
.gobackCity {
  width: 72.4%;
  padding-bottom: 0;
  margin-right: 5.8%;
}
.el-autocomplete {
  width: 36%;
}
.backOtherCity {
  width: 21.7%;
  height: 35px;
  border-radius: 5px;
  line-height: 1px;
}
.el-button--warning {
  width: 170px;
  font-size: 14px;
  height: 50px;
  display: block;
  margin: 0 auto;
  background-color: $_colorMain;
}
.tripName input {
  font-size: 18px;
  width: 84%;
}
.addAddress {
  padding-bottom: 0px;
}
.addAddress .itemName{padding-right: 28px;}
.addAddress input,
.addRemarks input {
  width: 84%;
}
.el-select .el-input .el-select__caret{display: none}
.el-input--suffix:hover .is-show-close{display: block!important}
.el-input {
  width: 85%;
}
.saveBtn{
  display: block!important;margin: 0 auto!important;
}
.el-date-editor .el-range-input{
  width:30%;
}
.addRemarks .itemName{
      width: 115px;
    display: inline-block;
}
</style>
