<template>
  <div class="bombBox" :msg="poiInfo" :n="current" ref="poi">
    <div class="mapPoiList clearfix" v-for="(item,idx) in poiInfo" :key="idx" ref="item" :id="'poi_'+(idx-0+1)" :data-poi="idx-0+1">
      <div class="fl left">
        <p class="clearfix">
          <b class="index fl">{{idx-0+1}}</b>
          <span class="title fl">{{item.title}}</span>
        </p>
        <p class="elRate"><el-rate v-model="item.star" disabled></el-rate></p>
      </div>
      <div class="fl right">
        <i class="fl addToTrip" :id="'addToTrip_'+(idx-0+1)" :data-addtrip="idx"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { Rate } from "element-ui";
export default {
  components: {
    elRate: Rate
  },
  props: {
    poiInfo: {
      type: Array,
      default: []
    },
    current: ""
  },
  data() {
    return {
      domList: []
    };
  },
  watch: {
    current(a, b) {
      //console.log("111111", a);
      this.$emit("sendDom", {
        dom: this.$refs["item_" + a][0].innerHTML,
        idx: a
      });
    },
    poiInfo() {
      //console.log("地图数据--2");
      this.$nextTick(() => {
        var domArr=[];
        //console.log(this.$refs.poi.childNodes.length)
        for (let i = 0; i < this.$refs.poi.childNodes.length; i++) {
          domArr.push(this.$refs.poi.childNodes[i].outerHTML);
        }
        this.$emit("sendDom", domArr);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.bombBox {
  background: #fff;
}
.mapPoiList {
  width: 230px;    position: absolute;z-index: 1111;
    top: 50%;display: none;
    left: 50%;
    margin-left: -125px;
    margin-top: -95px;
      padding: 12px 20px 10px;
background:#fff;cursor: pointer;
  box-shadow: 0px 1px 15px 1px rgba(25, 25, 25, 0.19);
}
.title {
  color: #666;
  font-size: 18px;
  padding-left: 14px;
  padding-bottom: 10px;
  width: 131px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.index {
  width: 18px;
  height: 18px;    line-height: 19px;
  background-color: #fd9600;
  font-size: 14px;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  margin-top: 2px;
}
.elRate + div {
  margin-left: 30px;
}
.addToTrip {
  background-image: url("images/addToTrip.png");
  background-repeat: no-repeat;
  background-size: 18px 18px;
  width: 18px;
  height: 18px;cursor: pointer;
}
.right {
      padding: 17px 0 14px 20px;
}

</style>
<style>
.mapPopBox:hover .mapPoiList{
display: block;
}
</style>
