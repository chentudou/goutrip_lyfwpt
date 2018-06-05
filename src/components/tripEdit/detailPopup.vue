<template>
    <transition name="detailPopup">
        <div v-if="show" class="detailPopup" :style="'height: ' + height + 'px;'">
            <!-- <div class="popUpBox"> -->
                <div class="detailTitle">
                    <div class="cnName">{{ pageData.cnName || pageData.enName }}</div>
                    <div class="enName">{{ pageData.enName || pageData.cnName }}</div>
                    <div class="close" @click="$emit('close')"></div>
                </div>
                <happy-scroll resize size="2" color="rgba(51,51,51,0.2)" style="height:100%;padding-bottom:65px;">
                    <div class="easyScroll" :style="'height: ' + height - 125 + 'px;'">
                        <div class="detailImg">
                            <img v-if="pageData.url" :src="pageData.url" alt="">
                            <img v-else src="../images/noViewDetailImg.png" alt="">
                            <!-- <div class="dataContent"
                                :style="'-webkit-line-clamp: ' + (this.expandContent ? '999' : '4') + ';height: ' + (this.expandContent ? 'auto' : '80px') + ';'"
                            >{{ pageData.content }}</div> -->
                            <div>{{ pageData.content }}</div>
                            <div class="expandContent" v-if="pageData.content&&pageData.content.length>150">
                                <span @click="expandContent = !expandContent">{{ expandContent ? '收起全部介绍' : '展开全部介绍' }}</span>
                            </div>
                        </div>
                        <ul class="baseData">
                            <li class="item clearfix" v-if="pageData.playTime">
                                <div class="fl itemKey">建议游玩：</div>
                                <div class="fl itemValue">{{ pageData.playTime }}</div>
                            </li>
                            <li class="item clearfix" v-if="pageData.openTime">
                                <div class="fl itemKey">营业时间：</div>
                                <div class="fl itemValue">{{ pageData.openTime }}</div>
                            </li>
                            <li class="item clearfix" v-if="pageData.ticketDescription">
                                <div class="fl itemKey">门票：</div>
                                <div class="fl itemValue">{{ pageData.ticketDescription }}</div>
                            </li>
                            <li class="item clearfix" v-if="false">
                                <div class="fl itemKey">地铁：</div>
                                <div class="fl itemValue"></div>
                            </li>
                            <li class="item clearfix" v-if="false">
                                <div class="fl itemKey">路线：</div>
                                <div class="fl itemValue"></div>
                            </li>
                            <li class="item clearfix" v-if="pageData.tel">
                                <div class="fl itemKey">电话：</div>
                                <div class="fl itemValue">{{ pageData.tel }}</div>
                            </li>
                            <li class="item clearfix" v-if="pageData.website">
                                <div class="fl itemKey">网址：</div>
                                <div class="fl itemValue">{{ pageData.website }}</div>
                            </li>
                            <li class="item clearfix" v-if="pageData.tips">
                                <div class="fl itemKey">小贴士：</div>
                                <div class="fl itemValue">{{ pageData.tips }}</div>
                            </li>
                        </ul>
                    </div>
                </happy-scroll>
                <div class="addTrip" @click="$emit('addItem',pageData.type, pageData.id, pageData.collection,idx,$event)">添加至行程</div>
            <!-- </div> -->
        </div>
    </transition>
</template>
<script>
    import {HappyScroll} from 'vue-happy-scroll'
    import 'vue-happy-scroll/docs/happy-scroll.css'
    export default {
        data () {
            return {
                msg: 'poi数据详情的弹出层',
                expandContent: true,
            }
        },
        created () {

        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            pageData: {
                type: Object,
                default () {
                    return {}
                }
            },
            idx:"",
            height: {
                type: Number,
                default: 0
                },
        },
        components: {
            HappyScroll
        },
        /* watch: {
            pageData(a){
                console.log(a)
            },
            idx(a){
                console.log(a)
            }
        } */ 
    }
</script>
<style scoped lang="scss">
    @import "../../assets/css/color.scss";
    /*弹出层样式和弹出层动画*/
    .detailPopup{
        width: 31%;
        height: 93.5%;
        padding-bottom: 65px;
        background: $_fontf;
        position: fixed;
        z-index: 10;
        bottom: 0;
        right: 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        transform: translateX(0);
    }
    .detailPopup-enter-active, .detailPopup-leave-active {
        transition: all .5s;
    }
    .detailPopup-enter, .detailPopup-leave-to{
        transform: translateX(100%);
    }
    /*详情样式*/
    .detailTitle{
       //position: absolute;
        width: 100%;
        background: #fff;
        text-align: center;
        min-height: 65px;
        border-bottom: 1px solid $_borderMain;
    }
    .cnName{
        color: $_fond3;
        font-size: 14px;
            padding-top: 15px;
    }
    .enName{
        color: $_fond9;
        font-size: 12px;
            padding-top: 5px;
    }
    .close{
        position: absolute;cursor: pointer;
        left: 20px;
        top: 20px;
        width: 12px;
        height: 12px;
        background: url("../../assets/images/icon_close_000.png") center no-repeat;
        background-size: 100% 100%;
    }
    .goMap{
        position: absolute;
        right: 20px;
        top: 20px;
        width: 18px;
        height: 17px;
        background: url("../../assets/images/icon_map_main.png") center no-repeat;
        background-size: 100% 100%;
    }
    .detailImg{
        border-bottom: 6px solid $_borderMain;
        padding: 20px;
        img{
            width: 100%;
            height: 200px;
            margin-bottom: 20px;
        }
    }
    .dataContent{
        font-size: 12px;
        line-height: 20px;
        min-height: 80px;
        color: $_fond6;
        overflow:hidden;
        display:-webkit-box;
        -webkit-box-orient:vertical;
    }
    .expandContent{
        text-align: right;
        font-size: 12px;cursor: pointer;
        color: $_fond6;
    }
    .expandContent:hover{color:#FD9600}
    .baseData{
        font-size: 12px;
        color: $_fond6;
        padding: 0 20px 60px;
        .item{
            border-bottom: 1px solid $_borderMain;
            padding: 20px 0 20px 15px;
            .itemKey{
                width: 20%;
            }
            .itemValue{
                width: 80%;
            }
        }
        .item:last-child{
            border-bottom: none;
        }
    }
    .addTrip{
        width: 100%;
        line-height: 60px;
        text-align: center;
        background: $_colorMain;
        color: $_fontf;
        font-size: 16px;
        position: absolute;
        bottom: 0;
        left: 0;
    }

</style>
<style>
    .detailPopup .easy-scrollbar__wrap{
        height:100%;overflow-y: scroll;overflow-x: hidden;
    }
</style>
