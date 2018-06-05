<template>
    <div class="rightList" >
        <happy-scroll resize size="2" color="rgba(51,51,51,0.2)">
            <!-- 收藏和游玩 -->
            <div :style="'height: ' + height + 'px;'" v-if="type === 'poiPlay' || type === 'poiCollect'">
                <div class="rightListItem rightListItemB" v-for="(item, index) in useData.list" :key="index" @mouseleave="mouseleaveItem"
                     @click="$emit('clickListItem', index, type)" @mouseenter="mouseenterItem(index)">
                    <div class="rightListItemImg fl">
                        <img v-if="item.url" :src="item.url" alt="">
                        <img v-else src="../images/noViewImg.png" alt="">
                        <div :class="['collectImg', { collectYes :   item.collection == 1 }]"
                            @click.stop="$emit('collect', item.id, index, item.collection, item.type)">
                        </div>
                    </div>
                    <div class="rightListItemText">
                        <p class="clearfix">
                            <span class="itemTitle fl">{{ item.cnName || item.enName }}</span>
                            <span :id="`addThis_`+index" class="addThis fr" @click.stop="$emit('addItem',item.type, item.id,  item.collection, index,$event,item.cityId)"></span>
                        </p>
                        <p class="rnglishTitle">{{ item.enName || item.cnName }}</p>
                        <p class="itemPraise">
                            <rate class="fl" :value="Number(item.starLevel)" disabled disabled-void-color="#DDDDDD"
                                :colors="['#FD9600', '#FD9600', '#FD9600']"></rate>
                                {{ item.score * 10 }}%好评率
                        </p>
                            <!--<div class="playTime">建议游玩时间：{{ item.playTime }}</div>-->
                    </div>
                    <div class="itemNumber">{{ index + 1 }}</div>
                    <!-- <div :id="`ball_`+index" class="ball"></div>  -->    
                </div>
                <Pagination
                    v-if="useData.base && useData.base.totalPage >  1"
                    :total="useData.base.totalRow"
                    @currentChange="currentChange"
                    :pageNum="pageNum">
                </Pagination>
            </div>
        </happy-scroll>
    </div>
</template>
<script>
    import { Rate,  Dropdown,  DropdownItem,  DropdownMenu, } from 'element-ui'
    import {HappyScroll} from 'vue-happy-scroll'
    import 'vue-happy-scroll/docs/happy-scroll.css'
    import Pagination from '@/components/tripEdit/pagination.vue'
    export default {
        data () {
            return {
                msg: '右侧的列表每一项',
                va3: 3,
            }
        },
        props: {
            type: {
                type: String,
                default: '' // 区分右侧列表中每一项的区别，经典路线(classicRoute)，设计行程(游玩poiPlay)，产品采购(productSourcing)
            },
            useData: {
                type: Object,
                default () {
                    return {}
                }
            },
            pageNum: {
                type: Number,
                default: 1
            },
            height: {
            type: Number,
            default: 0
            },
        },
        watch:{
            useData:{
                handler(a, b) {
                //console.log("useData---",a);
                this.useData['list']=a.list;
                this.useData['base']=a.base;
                //this.dateList[a.currentIndex - 1].traveldayIds = a.tripCityId.join(",");
                this.$set(this.useData, 'list', this.useData['list']); 
                this.$set(this.useData, 'base', this.useData['base']); 
                //console.log(this.useData);
            },
            deep: true
            }
        },
        methods: {
            currentChange (index) {
                // 页码改变
                this.$emit('currentChange', this.type, index)
            },
            mouseenterItem (index) {
                //console.log( this.type)
                // 鼠标移动到某一项触发地图变化，提交到vuex
                this.$store.dispatch('poiListHoverIndex',{type:this.type,index:index + 1})
            },
            mouseleaveItem () {
                // 鼠标从列表中移除的时候，
                this.$store.dispatch('poiListHoverIndex', {index:0})
            },
            /* 添加经典线路的行程到中间行程列表 */
            dropdownAddItem(item){
                console.log('添加经典线路的行程到中间行程列表',item)
            }
        },
        components: {
            Rate, HappyScroll, Pagination, Dropdown, DropdownItem, DropdownMenu,
        }
    }
</script>
<style scoped lang="scss">
    @import "../../assets/css/color.scss";
    .rightList{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .rightListItem{
        padding: 20px 30px 20px 30px;
        background: $_fontf;
        position: relative;cursor: pointer;
        overflow: hidden;
        border-bottom: 1px solid $_borderMain;
    }
    .rightListItemB{
        padding-left: 54px;
    }
    .rightListItem:last-child{
        border-bottom: none;
    }
    .itemNumber{
        position: absolute;
        top: 20px;
        left: 20px;
        width: 18px;
    height: 18px;
    line-height: 16px;
        border-radius: 3px;
        text-align: center;
        font-size: 15px;
        border: 1px solid $_colorMain;
        background: $_fontf;
        color: $_colorMain;
    }
    .rightListItem:hover{
        background:#f9f9f9;
    }
    .rightListItem:hover{
    .itemNumber{
        color: $_fontf;
        border: 1px solid $_colorMain;
        background: $_colorMain;
    }
    }
    .rightListItemImg{
        width: 95px;
        height: 95px;
        overflow: hidden;
        position: relative;
        margin-right: 16px;
        border-radius: 3px;
    img{
        width: 100%;
        height: 100%;
    }
    .collectImg{
        cursor: pointer;
        position: absolute;
        top: -4px;
        right: -4px;
        width: 35px;
        height: 35px;
        background: url("../../assets/images/img_01.png") center no-repeat;
        background-size: 100% 100%;
    }
    .collectYes{
        background: url("../../assets/images/img_02.png") center no-repeat;
        background-size: 100% 100%;
    }
    }
    .rightListItemText{
        position: relative;
        height: 95px;
        overflow: hidden;
    >div{
        width: 100%;
    }
    .itemTitle{
        font-size: 18px;
        color: $_fond3;
        margin-bottom: 3px;
    }
    .rnglishTitle{
        font-size: 16px;
        color: $_fond9;
        margin-bottom: 7px;
    }
    .itemPraise{
        font-size: 14px;
        color: $_fond9;
        line-height: 20px;
        margin-bottom: 7px;
    >i{
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }
    >i:last-child{
        margin-right: 22px;
    }
    .haveStart{
        background: url("../images/icon_havePraise.png") center no-repeat;
        background-size: 100% 100%;
    }
    .noStart{
        background: url("../images/icon_noPraise.png") center no-repeat;
        background-size: 100% 100%;
    }
    }
    .playTime{
        font-size: 14px;
        color: $_fond9;
    }
    .addThis{
        width: 26px;
        height: 26px;
        background: url("../images/icon_addThis.png") center no-repeat;
        background-size: 100% 100%;
        cursor: pointer;display: block;
    }
    .itemTitle, .rnglishTitle, .playTime{
        width: 88%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
    .rnglishTitle{
        height: 42px;
        -webkit-line-clamp: 2;
    }
    }
    .classicRouteContent{
        margin-top: 15px;
        font-size: 14px;
        color: $_fond9;
    }
    .ball{
    width: 18px;height: 18px;background-image:url('../images/ball.png');background-size: 18px;
    position: absolute;
}
</style>