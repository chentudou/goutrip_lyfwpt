<template>
    <div class="tripEdit" :style="`height:${winHeight}px`">
        <!--头部的行程单信息和功能按钮-->
        <tripEditHeader
            :member="member"
        ></tripEditHeader>
        <!--下面的三列内容-->
        <div class="tripEditCon clearfix" :style="`height:${conHeight}px`">
            <!--因为地图的原因，所以把左侧和中间两个组件放在一起计算宽度-->
            <div class="leftAndcenter fl">
                <!--左侧的列表-->
                <dayItem
                    class=""
                    :height="conHeight"
                    :toUpActive="toUpActive"
                    @update:dayData="val => dayData = val">
                </dayItem>
                <!--中间的地图和列表-->
                <centerCon
                    class="centerCon"
                    :height="conHeight - 50"
                    :centerConData="centerConData"
                    @mapListSwich="val => toUpActive = val"
                    @update:centerConData="val => centerConData = val">
                </centerCon>
            </div>
            <!--右侧的poi数据-->
            <rightpoi :height="conHeight" class="rightpoi fl"></rightpoi>
        </div>
        <!--客服-->
        <!-- <div class="customerService"></div> -->
    </div>
</template>
<script>
import tripEditHeader from "./widget/header";
import dayItem from "./widget/left";
import centerCon from "./widget/center";
import rightpoi from "./widget/right";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      msg: "行程编辑",
      conHeight:
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 65,
      toUpActive: 0,
      centerConData:{}
    };
  },
  computed: {
    ...mapGetters(["member"]),
    winHeight(){
        return this.conHeight+65
    }
  },
  created() {
    //console.log(this.member);
    /* 获取跳转过来的行程id */
    this.$store.dispatch("travelId", { travelId: this.$route.params.id });
    /* this.$store.dispatch("dateList",{
        travelId:this.travelId
    }) */
  },
  methods: {},
  components: {
    dayItem,
    centerCon,
    rightpoi,
    tripEditHeader
  }
};
</script>
<style scoped lang="scss">
@import "index.scss";
</style>
<style lang="scss">
@import "../../../assets/css/color.scss";

.rightpoi {
  .el-radio-group {
    width: 100%;
    height: 100%;
    label {
      width: 33.333%;
      height: 100%;
    }
  }
  .el-radio-button__inner {
    width: 100%;
    height: 100%;
    padding: 0;
    line-height: 50px;border-top: none;
    border-left: none !important;
    border-radius: 0 !important;
  }
  .el-tabs {
    height: 100%;
    .el-tabs__content {
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 50px;
      width: 100%;
      height: 100%;
    }
  }
  .el-tabs__nav {
    width: 100%;
    .el-tabs__item {
      width: 25%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      padding: 0;
    }
  }
  .poiDesignTripWrap {
    .el-tabs__item {
      width: 50%;
    }
  }
  .el-tabs__item.is-active {
    border-bottom: 2px solid $_colorMain;
  }
  .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__header {
    margin: 0;
  }
}
.editPeopleNumberInput{
        width: 30px;
        height: 28px;
        color: $_fond6;
        font-size: 12px;
        text-align: center;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding-left: 5px;
        padding-right: 5px;
    }
    
        .headerLeft i.el-tag__close.el-icon-close {
        position: absolute;
        top: -1px;
        opacity: 0;line-height: 1.1;
        left: 50%;    height: 14px;
    width: 14px;
    }
    .headerLeft span:hover i.el-tag__close.el-icon-close {
        opacity: 1;background: #FD9600;
    color: #fff;
    }
    .arrowRight,
    .addCity {
        height: 50px;
        line-height: 50px;
        max-width: 85%;
    }
    .addCity {
        width: 150px;min-width: 100px;
    }
    .addCity input,
    .currentCity input {
        border: 0;
        padding: 0;
    }
    .currentCity input {
        text-align: right;
        background: url("images/icon_address_main.png") 0 50%
        no-repeat;
        background-size: 10px 16px;padding-left: 15px;
    }
    .centerConHeader .headerLeft .arrowRight .elIconClose i {
        display: none;
        opacity: 0;
    }
    .vue-googlemap,.vue-googlemap-container {
        width: 100%;
    }
    /*添加航班信息的弹框样式*/
    .flightDialog{
        .el-dialog{
            height: 380px;
        }
        
        .el-dialog__body{
            padding: 0;
        }
        .el-dialog__footer{
            position: absolute;
            width: 100%;
            padding: 0;
            bottom: 25px;
            .dialog-footer{
                width: 100%;
                >div{
                    width: 50%;
                    padding: 0 35px;
                }
                .footerOk{
                    text-align: left;
                }
                .footerCencel {
                    text-align: right;
                }
                .el-button{
                    width: 120px;
                    text-align: center;
                }
            }
        }
        .el-date-editor{
            width: 89px !important;
            .el-input__prefix{
                display: none;
            }
            .el-input__suffix{
                display: none;
            }
            .el-input__inner{
                padding: 0;
                border: none;
                height: 20px;
            }
        }
    }
    .el-time-spinner.has-seconds .el-time-spinner__wrapper{
        width: 33%;
    }
    .el-time-panel__content::after, .el-time-panel__content::before{
        margin-top: -8px;
    }
    .flightTabs{
        .el-tabs__header{
            margin-bottom: 0;
        }
        .el-tabs__nav{
            width: 100%;
            .el-tabs__active-bar, .el-tabs__item{
                width: 50%;
                text-align: center;
            }
            .el-tabs__item{
                font-size: 24px;
                height: auto;
                line-height: normal;
                padding: 29px 0;
            }
        }
    }
    .selectTime{
        .el-input__inner{
            font-size: 16px;
            color: $_fond6;
        }
    }
.popover{
    background: rgba(0,0,0,.9)!important;color:#fff!important;text-align:center!important;
}
.popover[x-placement^=bottom] .popper__arrow::after,.popover[x-placement^=left] .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: rgba(0,0,0,.9)!important;
}    
.happy-scroll-container{width:100%!important;height: 100%!important}
.happy-scroll-content{border-right: 0 solid transparent!important;    border-bottom: 0 solid transparent!important;}
</style>
