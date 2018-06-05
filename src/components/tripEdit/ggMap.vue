<template>
<div class="mapContent">
  <div id="map" class="map">
  </div>
  <popBox v-show="isPopBox" :poiInfo="popBoxData" @sendDom="arr=>childMsg=arr"></popBox>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import popBox from "@/components/popBox";
import MarkerClusterer from "marker-precluster";
import viewMarker from "@/handler/viewMarker";
export default {
  components: {
    popBox,Message
  },
  props:{
    currentTabVal:{
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["mapWidth", "poiListPosition","addView",'poiListHoverIndex','currentCityId'])
  },
  data() {
    return {
      markers: [],
      zoom: 10,
      ggMap: "",
      iconBase: "http://114.112.69.204:8061/static/preview/images/",
      popBoxData: [],
      childMsg: {},
      isPopBox: false,
      latLngArr:[],
      bounds:{},
      compatibleTip:false
    };
  },
  watch: {
    /* 监听中间部分的宽度，实时跟新地图 */
    mapWidth(a, b) {
      this.createMarker();
    },
    /* 监听地图数据--并获取 */
    poiListPosition(a, b) {
      //console.log("地图数据--0",a);
      if(a.length) {
        this.markers = a;
      this.createMarker();
      }
    },
    /* 监听子组件传递过来的样式代码---创建地图弹层信息 */
    childMsg(a, b) {
      //console.log("地图数据--3")
      this.createInfoWin();
    },
    /* 监听右侧poi悬停时，对应的地图上的marker点跳跃 */
    poiListHoverIndex(a,b){
      //console.log('监听右侧poi悬停时',a)
      let currentBomb=document.getElementById("marker_"+a.index);
      let oldBomb=document.getElementById("marker_"+b.index);
      if(a.index){
        if(a.index&&a.type=='poiPlay'){
            currentBomb.classList.add('mapBomb');
            currentBomb.parentNode.parentNode.classList.add('mapPopBoxBomb');
        }
        if(b.index&&oldBomb.classList){
            oldBomb.classList.remove('mapBomb');
            oldBomb.parentNode.parentNode.classList.remove('mapPopBoxBomb');
        }else{
          return
        }
      }else if(oldBomb.classList){
        oldBomb.classList.remove('mapBomb');
      }
      
    },
    currentTabVal(a,b){
      a==0 && this.currentCityId==0 ?this.createMap():this.createMarker();
    },
    currentCityId(a,b){
      if(a==0) this.createMap();
    }
  },
  methods: {
    /* 创建地图 */
    createMap(params) {
      let center=params?{lat:Number(params.centerLat),lng:Number(params.centerLng)}:{lat:39.9,lng:116.38};
      this.ggMap = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: params?this.zoom:12,
        mapTypeId: "roadmap",
        mapTypeControl:false,//地图左上角的{卫星模式、地形模式}
        streetViewControl:false,//地图右下角的{‘小人’}
        zoomControl: true,
        scaleControl: true,
        rotateControl: true,  
        disableDragging:true,
        fullscreenControl: false//地图右上角{全屏}
      });
      this.ggMap.fitBounds(this.bounds);
      /* 在 火狐 或者 IE 浏览器下禁止地图拖动 */
      if(!this.compatibleTip){
       if (navigator.userAgent.indexOf("Firefox") > -1||(navigator.userAgent.indexOf("compatible") > -1 && navigator.userAgent.indexOf("MSIE") > -1 && !isOpera)) {  
          this.ggMap.setOptions({gestureHandling: "none"});//map.setOptions({gestureHandling: "none", keyboardShortcuts: false});
          this.compatibleTip=true;
          Message({
            showClose: true,
            duration:0,
            type:"warning",
            message:"为了更好的地图体验，请选择谷歌或国产浏览器"
          })
        } 
      }  
    },
    /* 获取到数据后----1，特定数据传递到子组件（生成样式）  2，提取经纬度设置地图的中心点和缩放值 */
    createMarker() {
      //console.log("地图数据--1")
      this.popBoxData.length = 0;
      this.latLngArr.length = 0;
      this.bounds = new google.maps.LatLngBounds();      //声明一个bounds
      for (let i = 0; i < this.markers.length; i++) {
        /* 过滤弹框里的内容并展示 */
        this.popBoxData.push({
          id: this.markers[i].id,
          title: this.markers[i].title,
          star: Number(this.markers[i].starLevel)
        });
        /* 所有经纬度 */
        this.latLngArr.push(
          this.markers[i].axes
        );
        this.bounds.extend(new google.maps.LatLng(this.markers[i].axes[0],this.markers[i].axes[1]));
      }
      /* 创建地图--并设置中心坐标 */
      this.createMap(this.designCenter());
    },
    /* 创建弹层 */
    createInfoWin() {
      //console.log("地图数据--4")
      new viewMarker(this.markers,this.ggMap,this.childMsg,this.iconBase+"null.png",this.$store);
    },
    /* 设计中心点和最大差（经度或纬度） */
    designCenter(){
      let maxMin=this.maxMinVal();
      return {
        centerLat:(Number(maxMin.maxLat) + Number(maxMin.minLat))/2, 
        centerLng:(Number(maxMin.maxLng) + Number(maxMin.minLng))/2,
        //maxDiff:Math.max.apply(Math,[maxMin.maxLat-maxMin.minLat,maxMin.maxLng-maxMin.minLng])
      }
    },
    /* 计算经纬度里面最东、南、西、北 的四个值 */
    maxMinVal(){
      let latArr=[],lngArr=[];
      //console.log(this.latLngArr)
      for(let i=0;i<this.latLngArr.length;i++){
        latArr.push(this.latLngArr[i][0]);
        lngArr.push(this.latLngArr[i][1]);
      }
      return {
        maxLat:Math.max.apply(Math,latArr),
        minLat:Math.min.apply(Math,latArr),
        maxLng:Math.max.apply(Math,lngArr),
        minLng:Math.min.apply(Math,lngArr)
      }
    }
  }
};
</script>
<style scoped>
.map{
  position: relative;    width: 100%;
    height: 100%;
}
.mapContent{
  width:100%;height: 100%;
}
.poiList {
  width: 230px;
  position: fixed;
  padding: 10px 20px;
  top: 100px;
  right: 0;
  box-shadow: 0px 1px 16px 1px rgba(25, 25, 25, 0.19);
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
  height: 18px;
  background-color: #fd9600;
  font-size: 14px;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  margin-top: 4px;
}
.elRate {
  margin-left: 30px;
}
.addToTrip {
  background-image: url("../images/addToTrip.png");
  background-repeat: no-repeat;
  background-size: 18px 18px;
  width: 18px;
  height: 18px;
}
.right {
  padding: 20px 0 20px 20px;
}
.infoWin {
  background: #fff;
  overflow: hidden;
  padding: 10px 15px;
  border-radius: 5px;
}
.marker{
      width: 28px;
    height: 35px;
    display: inline-block;
    text-align: center;
    line-height: 1;
    padding-top: 5px;
    font-size: 16px;
    color: red;
}
</style>
<style>
.mapPopBoxBomb{
  z-index: 9999 !important;
}
 .mapBomb{ 
   animation: mapBombBox .7s infinite; 
    -moz-animation: mapBombBox .7s infinite;	/* Firefox */
    -webkit-animation: mapBombBox .7s infinite;	/* Safari 和 Chrome */
    /* position: absolute;z-index: 9999; */
    background:url('../images/0.png')!important;color:#FD9600!important;
  }  
  @keyframes mapBombBox {  
    0% {transform: translate(0px, 0px); transform: translate(0px, 0px); transform: translate(0px, 0px); }  
    25% {transform: translate(0px, -4px); transform: translate(0px, -4px); transform: translate(0px, -4px); }  
    50% {transform: translate(0px, -8px);transform: translate(0px, -8px);transform: translate(0px, -8px);}  
    75% {transform: translate(0px, -4px);transform: translate(0px, -4px);transform: translate(0px, -4px);}  
     100% {transform: translate(0px, 0px);transform: translate(0px, 0px);transform: translate(0px, 0px);}  
  }       
  @-moz-keyframes mapBombBox {  
    0% {-moz-transform: translate(0px, 0px);-moz-transform: translate(0px, 0px);-moz-transform: translate(0px, 0px); }  
    25% {-moz-transform: translate(0px, -4px);-moz-transform: translate(0px, -4px);-moz-transform: translate(0px, -4px); }  
    50% {-moz-transform: translate(0px, -8px);-moz-transform: translate(0px, -8px);-moz-transform: translate(0px, -8px);}  
    75% {-moz-transform: translate(0px, -4px);-moz-transform: translate(0px, -4px);-moz-transform: translate(0px, -4px);}  
     100% {-moz-transform: translate(0px, 0px);-moz-transform: translate(0px, 0px);-moz-transform: translate(0px, 0px);}  
  }       
  @-webkit-keyframes mapBombBox {  
    0% {-webkit-transform: translate(0px, 0px);-webkit-transform: translate(0px, 0px);-webkit-transform: translate(0px, 0px); }  
    25% {-webkit-transform: translate(0px, -4px);-webkit-transform: translate(0px, -4px);-webkit-transform: translate(0px, -4px); }  
    50% {-webkit-transform: translate(0px, -8px);-webkit-transform: translate(0px, -8px);-webkit-transform: translate(0px, -8px);}  
    75% {-webkit-transform: translate(0px, -4px);-webkit-transform: translate(0px, -4px);-webkit-transform: translate(0px, -4px);}  
     100% {-webkit-transform: translate(0px, 0px);-webkit-transform: translate(0px, 0px);-webkit-transform: translate(0px, 0px);}  
  }       
  @-ms-keyframes mapBombBox {  
    0% {-ms-transform: translate(0px, 0px);-ms-transform: translate(0px, 0px);-ms-transform: translate(0px, 0px); }  
    25% {-ms-transform: translate(0px, -4px);-ms-transform: translate(0px, -4px);-ms-transform: translate(0px, -4px); }  
    50% {-ms-transform: translate(0px, -8px);-ms-transform: translate(0px, -8px);-ms-transform: translate(0px, -8px);}  
    75% {-ms-transform: translate(0px, -4px);-ms-transform: translate(0px, -4px);-ms-transform: translate(0px, -4px);}  
     100% {-ms-transform: translate(0px, 0px);-ms-transform: translate(0px, 0px);-ms-transform: translate(0px, 0px);}  
  }       
</style>
