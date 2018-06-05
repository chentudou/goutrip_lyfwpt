<template>
  <div class="classicRoute">
      <happy-scroll resize size="2" color="rgba(51,51,51,0.2)">
        <div :style="'height: ' + realHeight + 'px;'">
            <div class="routeItem clearfix" v-for="(item, index) in classicRoute.list" :key="index">
                <div class="leftImg fl">
                    <img v-if="item.tripUrl" :src="item.tripUrl" alt="">
                    <img v-else src="" alt="">
                </div>
                <div class="rightContent">
                    <div class="clearfix">
                        <span class="fl tripName">{{item.tripName}}</span>
                        <dropdown class="fr" :trigger="'click'" :show-timeout="0" :hide-timeout="0" :placement="'bottom-start'"
                            @command="addClassicRoute">
                            <i class="addThis dropdown-link"></i>
                            <dropdown-menu slot="dropdown">
                                <dropdown-item v-for="(it, idx) in item.poiInfo"  :key="idx"
                                :command="{ info:it }">添加行程的D{{idx+1}}部分</dropdown-item>
                            </dropdown-menu>
                        </dropdown>
                    </div>
                    <ul class="classicRouteContent">
                        <li v-for="(it, idx) in item.poiInfo" :key="idx">
                            <i>D{{idx+1}}</i>  
                            <span v-for="(t, i) in it" :key="i" @click="$emit('classicDetail',t.id)">
                                <b v-if="t" style="font-weight:500">{{t.cnName}}></b>
                            </span>
                        </li>
                    </ul>
                   <!--  <p>圣淘沙岛>圣淘沙岛>圣淘沙岛>圣淘</p> -->
                </div>
            </div>
        </div>
      </happy-scroll>
  </div>
</template>
<script>
import { Rate,  Dropdown,  DropdownItem,  DropdownMenu } from 'element-ui'
import {HappyScroll} from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import Pagination from '@/components/tripEdit/pagination.vue'
export default {
    props:{
        classicRoute:{
            type:Object,
            default:''
        },
       /*  pageNum:{
            type: Number,
            default: 1
        }, */
        height: {
            type: Number,
            default: 0
        },
    },
    computed: {
      realHeight(){
          return this.height-50;
      }  
    },
    methods: {
        /* 添加经典线路的行程到中间行程列表 */
        addClassicRoute(item,e){
            //console.log('添加经典线路的行程到中间行程列表',item,e)
            this.$emit("addClassicItems",item);   
        }
    },
    components: {
        Rate, HappyScroll, Pagination, Dropdown, DropdownItem, DropdownMenu,
    }
}
</script>
<style>
    .leftImg {
        width: 95px;margin-right: 16px;
        height: 95px;border-radius: 3px;
    }
    .leftImg img{
        width: 100%;height:100%;
    }
    .rightContent{
        overflow: hidden;
    }
    .routeItem{
        padding: 20px 30px 20px 30px;
    background: #fff;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
    }
    .addThis{
    width: 26px;background-image: url('../images/addToTrip.png');
    height: 26px;background-size: 100% 100%;
    cursor: pointer;
    display: block;
    }
    .classicRouteContent{
        padding-top: 12px;font-size: 14px;color: #999;clear: both;
    }
    .classicRouteContent li{
            margin-top: 5px;
    }    
    .classicRouteContent i{
            font-weight: 700;
    }
    .classicRouteContent span:hover{
        color:#FD9600;cursor: pointer;
    }
    .tripName{
       font-size: 16px;color: #333;
    }
</style>
