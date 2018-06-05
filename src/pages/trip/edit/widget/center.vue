<template>
    <div class="centerConWrap" :class="mapWidth ? 'w100' : 'w72'">
        <popover ref="popRegionUse" placement="bottom" width="205" :value="popRegionUse" trigger="manual" :visible-arrow="false"
        content="这里是操作区，可以查看地图和行程列表" popper-class="popover"></popover>
        <popover ref="popUpdataCity" placement="bottom" width="205" :value="popUpdataCity" trigger="manual" :visible-arrow="true"
        content="这里可以添加、修改当天城市" popper-class="popover"></popover>
        <popover ref="popAddDiray" placement="bottom" width="205" :value="popAddDiray" trigger="manual" :visible-arrow="true"
        content="点击这里可添加当日笔记和航班" popper-class="popover"></popover>
        <popover ref="popUseMap" placement="bottom" width="205" :value="popUseMap" trigger="manual" :visible-arrow="true"
        content="点击切换地图界面" popper-class="popover"></popover>
        <popover ref="popSaveTrip" placement="bottom" width="405"  trigger="manual" :value="popSaveTrip" :visible-arrow="false"
        content="每一步操作确认后随时更新保存，不用担心行程丢失" popper-class="popover"></popover>

        <div class="centerConHeader clearfix">
            <!--中间内容的头-->
            <div class="headerLeft fl clearfix">
                <div class="arrowRight fl">
                    <el-tag class="elIconArrowRight" v-if="currentInfo.tripCityName" closable type="info"
                            v-for="(item,idx) in currentInfo.tripCityName" :class="{elIconClose:currentInfo.tripCityId[idx]==0}"
                            @close="tagClose(idx)" :key="idx">{{item}}</el-tag>
                </div>
                <el-input class="addCity fl" v-model="addCity" :fetch-suggestions="queryCityAbroad" placeholder="+添加城市" @select="tripCitySelect" v-popover:popUpdataCity></el-input>
            </div>
            <div class="headerRight fr">
                <!--更换城市的下拉列表-->
                <el-select class="fl currentCity" v-model="currentCity" :placeholder="currentInfoOfLast" @change="currentCityChange">
                    <el-option
                        v-for="(item,idx) in options"
                        :key="idx"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="mapListTab fl" v-popover:popUseMap>
                    <!--地图和列表的tab切换-->
                    <div
                        :class="['fl', { mapListTabActive: mapListTabActive === 0 }]"
                        @click="mapListTabActive = 0"
                    >地图模式</div>
                    <div id="addedList"
                        :class="['fl', { mapListTabActive: mapListTabActive === 1 }]"
                        @click="mapListTabActive = 1"
                    >列表模式</div>
                </div>
                <!--最右侧的加号，添加操作的-->
                <dropdown class="fl" :trigger="'click'" :show-timeout="0" v-popover:popAddDiray
                    :hide-timeout="0" :placement="'bottom-start'" @command="dropdownItemClick" >
                    <div class="addOperating dropdown-link"></div>
                    <dropdown-menu slot="dropdown">
                        <!--下拉列表数据，需要遍历-->
                        <dropdown-item command="0">添加航班信息</dropdown-item>
                        <!-- <dropdown-item command="1">添加用车信息</dropdown-item> -->
                        <dropdown-item command="2">添加当日笔记</dropdown-item>
                        <dropdown-item command="3">清空该日日程</dropdown-item>
                    </dropdown-menu>
                </dropdown>
            </div>
        </div>
        <div class="mapAndList clearfix" v-popover:popRegionUse  v-popover:popSaveTrip>
                <!--地图的内容-->
            <div class="googleMap" v-show="!mapListTabActive" :style="'height: ' + height + 'px;'">
                <googleMap name="googleMap" :currentTabVal="mapListTabActive"></googleMap>
            </div>
                <!-- 滚动列表 -->
            <div class="scrollList clearfix"  :style="'height: 750px;'" :class="mapListTabActive" v-show="mapListTabActive">
                <!-- 列表第一项为行程安排概述   不能拖动   -->
                <div class='top_btn' @click="diaryDialogVisible = true">
                    <p>+添加当日笔记</p>
                </div>
                <happy-scroll resize size="2" color="rgba(51,51,51,0.2)" class="easyScroll" v-if="isList">
                <!--列表内容-->
                    <div :style="'height: 600px;background:#F4F4F4'">
                        <div class="otherItem">
                                    <!-- 行程概述 -->
                            <div class="tripArrange centerImg" v-if="tripData.fixed.remarks">
                                <p>{{tripSummary}}</p>
                                <div class="ICTIntroduction">{{ tripData.fixed.remarks }}</div>
                            </div>
                            <!-- 飞机 -->
                            <div  v-for="(item,idx) in tripData.flightList" :key="idx" class="tripFlight clearfix" v-if="tripData.flightList.length">
                                <div class="fl">
                                    <div class="startTime">{{ item.departureHour }}:{{ item.departureMinute }}</div>
                                    <div class="ICTIntroduction">{{ item.departureAirport }}</div>
                                </div>
                                <div class="fl flightShift">
                                    <div class="flightShiftText">{{ item.shift }}</div>
                                    <div class="flightShiftLine"></div>
                                </div>
                                <div class="fl">
                                    <div class="endTime">{{ item.arrivalHour }}:{{ item.arrivalMinute }}</div>
                                    <div class="ICTIntroduction">{{ item.endStation }}</div>
                                </div>
                                <div class="removeCurrentItem fr" @click.stop="removeCurrentItem(item.eventId, idx,item.type)"></div>
                            </div>
                            <!-- 用车 -->
                        </div>
                        <draggable v-if="tripData.poiList.length"
                            v-model="tripData.poiList" @end="checkEnd"
                            :options="{
                            // disabled:'disabled', // 禁用
                            chosenClass: 'chosen',   // 拖动中元素的类名
                            ghostClass: 'ghost',    // 拖拽中占位的元素的类名（一般设置opacity:1）达到空出该位置的视觉效果
                            }" class="itemWrap" :style="`height:${minCenterHeight}px`">
                            
                            <!--循环poi的信息-->
                            <div class="poiItem" v-for="(item, index) in tripData.poiList" :key="index">
                                <div class="poiInfo viewIcon clearfix" :class="{'viewIconTop':index==tripData.poiList.length}">
                                    <div class="itemContent fl" v-if="item.type !== 3">
                                        <span>{{ item.cnName || item.enName }}</span>
                                        <span>{{ item.enName }}</span>
                                        <p class="ICTIntroduction">{{ item.enName }}</p>
                                    </div>
                                        <!-- <div v-if="item.type === 3" class="itemCenterFlight clearfix">
                                            <div class="fl">
                                                <div class="startTime">{{ item.departureHour }}:{{ item.departureMinute }}</div>
                                                <div class="ICTIntroduction">{{ item.departureAirport }}</div>
                                            </div>
                                            <div class="fl flightShift">
                                                <div class="flightShiftText">{{ item.shift }}</div>
                                                <div class="flightShiftLine"></div>
                                            </div>
                                            <div class="fl">
                                                <div class="endTime">{{ item.arrivalHour }}:{{ item.arrivalMinute }}</div>
                                                <div class="ICTIntroduction">{{ item.endStation }}</div>
                                            </div>
                                        </div> -->
                                        <!-- <div class="itemCenterLine">
                                            <div class="topLine"></div>
                                            <div class="centerImg" :class="[ { centerImgPlay : item.type == 1 }, { centerImgFlight : item.type === 3} ]"></div>
                                            <div class="bottomLine"></div>
                                        </div> -->
                                    <i class="removeCurrentItem fl" @click.stop="removeCurrentItem(item.eventId, index, item.type)"></i>
                                </div>
                                <!--公里数-->
                                <div class="distance" v-if="!(index + 1 === tripData.poiList.length)">{{ latLngDistance[index]  }}</div>
                            </div>
                        </draggable>
                    </div>    
                </happy-scroll>
                <div class="noData" v-else>
                    <img src="../images/noView.png"/>
                    <span>您还未添加游玩景点</span>
                </div>
                <div class='bot_btn' @click="deteleClick">
                    <p>清空该日日程</p>
                </div> 
            </div>
            
        </div>
        <el-dialog
            title="添加航班信息"
            :visible.sync="flightDialogVisible"
            :append-to-body="true" :center="true"
            :show-close="true"
            width="950px"
            class="flightDialog">
                    <div class="flightTabsWrap addFlightData">
                        <div class="Shifts clearfix">
                            <div class="fl inputItem">
                                <span>班　次：</span>
                                <input type="text" v-model="flightTabsModelData.shift">
                            </div>
                            <div class="fr inputItem">
                                <span>花　费：</span>
                                <input type="text" v-model="flightTabsModelData.costPrice">
                            </div>
                        </div>
                        <div class="selectCityTime">
                            <div class="start clearfix">
                                <div class="startCity fl">
                                    <div class="fl inputItem">
                                        <span>出发站：</span>
                                        <input type="text" placeholder="输入出发城市" v-model="flightTabsModelData.cityStation">
                                    </div>
                                    <div class="fl inputItem">
                                        <span>出发机场：</span>
                                        <input type="text" placeholder="输入出发机场" v-model="flightTabsModelData.departureAirport">
                                    </div>
                                </div>
                                <div class="startTime fr">
                                    <div class="fl inputItem">
                                        <span>出发日期：</span>
                                        <el-date-picker
                                            v-model="flightTabsModelData.departureTime"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </div>
                                    <div class="fl inputItem">
                                        <span>出发时间：</span>
                                        <el-time-picker
                                            v-model="departureTime"
                                            placeholder="选择时间"
                                            format="HH:mm"
                                            value-format="HH:mm"
                                            @change="departureTimeFormat"
                                        >
                                        </el-time-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="end clearfix">
                                <div class="endCity fl">
                                    <div class="fl inputItem">
                                        <span>到达站：</span>
                                        <input type="text" placeholder="输入到达城市" v-model="flightTabsModelData.endCity">
                                    </div>
                                    <div class="fl inputItem">
                                        <span>到达机场：</span>
                                        <input type="text" placeholder="输入到达机场" v-model="flightTabsModelData.endStation">
                                    </div>
                                </div>
                                <div class="endTime fr">
                                    <div class="fl inputItem">
                                        <span>到达日期：</span>
                                        <el-date-picker
                                            v-model="flightTabsModelData.arrivalTime"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期"
                                        >
                                        </el-date-picker>
                                    </div>
                                    <div class="fl inputItem">
                                        <span>到达时间：</span>
                                        <el-time-picker
                                            v-model="arrivalTime"
                                            placeholder="选择时间"
                                            format="HH:mm"
                                            value-format="HH:mm"
                                            @change="arrivalTimeTimeFormat"
                                        >
                                        </el-time-picker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- </el-tab-pane> -->
            <!-- </el-tabs> -->
            <div slot="footer" class="dialog-footer clearfix" v-if="flightTabsModel === '2'">
                <div class="footerCencel fl">
                    <el-button @click="flightDialogHidden">取 消</el-button>
                </div>
                <div class="footerOk fl">
                    <el-button type="primary" @click="flightDialogClickOk">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        <!--添加当时笔记的dialog弹框-->
        <el-dialog
            title="添加当日笔记"
            :visible.sync="diaryDialogVisible"
             width="70%"
            :append-to-body="true" 
            :show-close="true">
            <div class="diaryTitleEditDialog clearfix">
                <span class="fl">标题：</span>
                <input class="diaryTitleEdit fr" v-model="diaryTitle" maxlength="30" v-focus="diaryDialogVisible" />
            </div>
            <div class="diaryTxtEditDialog clearfix">
                <span class="fl">内容：</span>
                <textarea v-model="diaryTxt" class="diaryTxtEdit fr" v-focus="diaryDialogVisible" maxlength="300"></textarea>
                
            </div>
            <div class="textLimit fr">{{ diaryTxtLength }}/300字</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="diaryDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDiary">确 定</el-button>
            </div>
        </el-dialog>            
    </div>
</template>
<script>
import draggable from "vuedraggable";
import googleMap from "@/components/tripEdit/ggMap";
import { Dropdown, Popover,DropdownItem,Loading , DropdownMenu, tag, Autocomplete, Message, Select, Option, MessageBox, Dialog, Button, Tabs, TabPane,DatePicker, TimePicker } from "element-ui";
/* import EasyScroll from "easyscroll";
 */
import {HappyScroll} from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import { mapGetters } from "vuex";
import api from "@/handler/tranfer";

    export default {
        computed: {
            ...mapGetters(["popoverEvery","currentInfo","centerListEventId", "errInfo", "addPoiToCenterList",'addClassicToCenterList', "poiListPosition","mapWidth","popoverEvery"]),
            /* 计算当前日期下的最后一个城市 */
            currentInfoOfLast: function(val) {
                if (this.currentInfo.tripCityName) {

                    return this.currentInfo.tripCityName[
                    this.currentInfo.tripCityName.length - 1
                        ];
                } else {
                    return "曼谷";
                }
            },
            diaryTxtLength(){
                if(this.diaryTxt){
                    return this.diaryTxt.length
                }else{
                    return 0
                }
            }
            /* isList:function(){
                if(this.tripData.fixed&&this.tripData.poiList&&this.tripData.flightList){
                    if(this.tripData.fixed.remarks||this.tripData.poiList.length>0||this.tripData.flightList.length>0){
                        console.log("111111111")
                        return true
                    }else{
                        return false
                    }
                }
                
            } */
        },
        data() {
            return {
                msg: "中间的地图和列表",
                mapListTabActive: 0, // tab切换的下标
                tripData: { /* 行程数据 */
                    poiList: [],/* poi列表 */
                    fixed:{},/* 固定在中间头部的信息=--行程安排 */
                    flightList:[]/* 航班信息--（可以添加多个航班信息--所以用数组） */
                },
                addCity: "",/* 当前日期下---添加城市 */
                options:[],
                currentCity:this.currentInfoOfLast,
                flightDialogVisible: false,/* 航班弹框相关 */
                flightTabsModel: '2',/* 航班默认选项--（没有查询接口） */
                flightTabsModelData: {},
                departureTime: '',                  // 这个日期需要处理才能添加到flightTabsModelData
                arrivalTime: '',                     // 这个日期需要处理才能添加到flightTabsModelData
                latLngArr:[],
                latLngDistance:[],
                PI : Math.PI,
                diaryDialogVisible:false,/* 日记相关 */
                diaryTitle:'',
                diaryTxt:'',    
                isList:false,
                classicRouteCommitTime:0,//经典行程提交次数
                popRegionUse:false,
                popUpdataCity:false,
                popAddDiray:false,
                popUseMap:false,
                popSaveTrip:false,
                otherItemHeight:87,/* 行程安排--航班--用车等信息占用的头部的高度（行程安排默认显示） */
                minCenterHeight:'100%',
                loadingInstance: null,
                tripSummary:'行程概述'
            }
        },
        props: {
            height: {
                type: Number,
                default: 0
            }
        },
        watch: {
            // 监听右侧poi的点击加号动作，然后把数据push进页面里面
            addPoiToCenterList:{
                handler(a,b) {
                    this.tripData.poiList.push(a[a.length-1]);
                    //console.log('current--centerListLength',this.tripData.poiList.length)
                    //if (this.tripData.poiList.length>8) this.minCenterHeight=950+(this.tripData.poiList.length-8)*103;
                    this.isList=true;
                },
                deep:true
            }, 
            /* 监听右侧的classicRoute 的 加号动作，然后把数据（数组）push进页面 */
            addClassicToCenterList(a,b){
                
                for(let n=0;n<a.length;n++){
                    //console.log('addClassicToCenterList',a[n])
                    this.tripData.poiList.push(a[n]);
                    this.isList=true;
                }
                this.classicRouteCommitTime++;
                this.$store.dispatch('clearClassicRoute',this.classicRouteCommitTime);
            },
            /* 监听当前日期下的信息变化 */
            currentInfo: {
                handler(a, b) {
                    a.tripCityId[a.tripCityId.length-1]?
                        this.$store.dispatch("currentCityId",a.tripCityId[a.tripCityId.length-1]):
                        this.$store.dispatch("currentCityId",0);/* 切换行程日期之后，的最后一个城市id */
                        //console.log(a.tripCityId,a.tripCityName);
                    this.options=[];/* 清空数组，方便后续的数组重新push对象 */
                    for(let i=0;i<a.tripCityId.length;i++){
                        this.options[i]={
                            value:a.tripCityId[i],
                            label:a.tripCityName[i]
                        };
                    }
                    this.currentCity="";/* 清空当前城市，方便在切换日期时，修改为当前日期下的最后一个城市 */
                    /* 切换日期之后，看是否需要通知后台 */
                    if(a.dayId===b.dayId){
                        let briefId = this.currentInfo.tripCityId.join(",");
                        let briefStr = briefId;
                        let params = {
                            cityIds: this.currentInfo.tripCityId.join(","),
                            dayName: this.currentInfo.tripCityName.join(">"),
                            originCity:this.currentInfo.tripCityName && this.currentInfo.tripCityId[0] == 0? this.currentInfo.tripCityName[0]: "",
                            dayId: this.currentInfo.dayId
                        };
                        api.post("/trip/edit/updateTripCity", params).then(res => {
                            if (res.rescode == "200") {
                                Message({
                                    type: "success",
                                    message:"操作成功"
                                });
                            }else{
                                Message({
                                    type: "error",
                                    message:"操作失败"
                                });
                            }
                        });
                    } else {
                        //console.log('切换日期后this.tripData为空');
                        this.tripData={
                            poiList:[],
                            fixed:{},
                            flightList:[]
                        };
                        this.getListData()
                    }
                },
                deep: true
            },
            errInfo(a) {
                if (a) {
                    Message({
                        type: "error",
                        message: a
                    });
                }
                this.$store.dispatch("errInfo");
            },
            /* 监听列表动作，实时更新两个景点的经纬度 */
            'tripData.poiList'(a){
               // console.log("1111111111")
                this.latLngArr.length=0;
                this.tripData.poiList.map(item=>{
                    this.latLngArr.push({
                    lat:item.latitude,
                    lng:item.longitude
                    })
                })
                this.designDistance();
            },
            // 出发时间格式化
            departureTime (val) {
                this.departureTimeFormat(val)
            },
            // 到达时间格式化
            arrivalTime (val) {
                this.arrivalTimeTimeFormat(val)
            },
            popoverEvery(a,b){
                //console.log("center")
                let val=`pop${a.val}`;
                if(!this[val]){
                    this[val]=!this[val];
                setTimeout(()=>{this[val]=!this[val]},2000);
                }
            },
            /* tripData(a){
                console.log('aaaa',a,a.fixed,typeof a.poiList,a.flightList[0]);
                if(a.fixed.remarks||a.poiList.length>0||a.flightList.length>0){
                    
                    this.isList=true;
                }else{
                    this.isList=false;
                }
            } */
            mapListTabActive(a){
                if(a){
                    if(this.tripData.fixed.remarks||this.tripData.poiList.length>0||this.tripData.flightList.length>0){
                        this.isList=true;
                    }else{
                        this.isList=false;
                    }
                }
            }
        },
        created() {
            this.flightDataInit();
        },
        methods: {
            // 获取中间列表数据
            getListData () {
                api.post('/trip/edit/getCenterList', {
                    dayId: this.currentInfo.dayId
                }).then((res) => {
                    //console.log('获取中间列表数据',res)
                    //this.$set(this.tripData, 'list', [])
                    res.items.map((team, index, arr) => {
                        if(team.poi){
                            this.tripData.poiList.push(team.poi);
                            //this.$set(this.tripData.poiList, index, team.poi )
                        }else if(team.customDay){
                            this.tripData.fixed=team.customDay;
                            this.tripSummary=this.tripData.fixed.title
                            //this.$set(this.tripData.poiList, index, team.poi )
                        }else if(team.filight){
                           // console.log('team.filight',team.filight)
                            this.tripData.flightList.push( team.filight );
                            //this.$set(this.tripData.flightList, index,  team.filight );
                        }
                        
                    });
                    //console.log('this.tripData',this.tripData)
                    this.tripData.flightList.length||this.tripData.fixed.remarks||this.tripData.poiList.length? this.isList=true : this.isList=false;
                    /* this.tripData.poiList.unshift(this.tripData.other); */
                }).catch((err) => {
                    new Error('获取中间列表资源失败')
                })
            },
            // 拖动结束后执行的函数
            checkEnd(evt) {
                let loadingInstance = Loading.service({ target: document.querySelector(".mapAndList") });
                let end_id = evt.newIndex === (this.tripData.poiList.length - 1) ? 0 : this.tripData.poiList[evt.newIndex + 1].eventId
                let start_id = this.tripData.poiList[evt.newIndex].eventId
                api.post('/trip/edit/centerListDrag', {
                    start_id: start_id,
                    end_id: end_id
                }).then(res => {
                    loadingInstance.close();
                    if(res&&res.rescode=='200'){
                        Message({
                        type: "success",
                        message: res.resDescription})
                    }else{
                        Message({
                        type: "error",
                        message: '拖动失败'
                        });
                        this.tripData={poiList: [],fixed:{},flightList:[]};
                        console.log('获取中间列表数据',)
                        this.getListData()
                    }  
                })   
            },
            // 点击中间部分右侧的加号里面的每一项
            dropdownItemClick(item){
                //console.log("dropdownItemClick",item)
                this.popAddDiray=false;
                if (item === '2') this.diaryDialogVisible = true, this.queryDiary();
                if (item === '0') this.flightDialogVisible = true;
                if (item== '3' ) this.removeAllData();
            },
            // 删除这条行程数据
            // 需要二次确认
            removeCurrentItem (id, index,type) {
                console.log("center---delete-poi",id, index,type);
                MessageBox.confirm('此操作将删除本条信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    
                }).then(() => {
                    api.post('/trip/edit/removeCenterItemData', {
                        eventId: id
                    }).then( res => {
                        if(res.rescode=='200'){
                            if(type!=3) this.tripData.poiList.splice(index, 1);
                            if(type == 3) this.tripData.flightList.splice(index, 1);
                            if(!this.tripData.poiList.length&&!this.tripData.flightList.length&&!this.tripData.fixed.remarks) this.isList=false;
                        }
                        //console.log(res);
                        res?Message({
                            type: "success",
                            message: res.resDescription
                            }):Message({
                                type: "error",
                                message: '删除失败'
                            })
                    })
                }).catch(() => {

                })
            },
            /* 删除当天所有行程 */
            deteleClick () {
                this.removeAllData()
            },
            removeAllData(){
                MessageBox.confirm('此操作将清除今日行程，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    api.post('/trip/edit/removeCenterAllData', {
                        dayId: this.currentInfo.dayId
                    }).then( res => {
                        this.tripData.poiList=[];
                        if(!this.tripData.poiList.length&&!this.tripData.flightList.length&&!this.tripData.fixed.remarks) this.isList=false;
                        //console.log(res);
                        res?Message({
                            type: "success",
                            message: '删除成功'
                            }):Message({
                                type: "error",
                                message: '删除失败'
                            })
                    }).catch(() => {

                    })
                })
            },
            /* 删除当前已经添加的城市 */
            tagClose(idx) {
                /* 提交vuex */
                this.$store.dispatch("delCurrentInfo", idx);
            },
            currentCityChange(id){
                id?this.$store.dispatch("currentCityId",id):this.$store.dispatch("currentCityId",0);
            },
            /* 头部添加城市 */
            tripCitySelect(item) {
                //console.log('tripCitySelect',item)
                this.$store.dispatch("addCurrentInfo", item);
                this.addCity = "";
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
            /* 查询国外城市 */
            queryCityAbroad(queryString, cb) {
                if (!this.cityAbroad || this.cityAbroad == "") {
                    api.post("/manage/selectCityAbroad").then(res => {
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
                        var results = queryString
                            ? this.cityAbroad.filter(this.createStateFilter(queryString))
                            : this.cityAbroad;
                        cb(results);
                    });
                } else {
                    var results = queryString
                        ? this.cityAbroad.filter(this.createStateFilter(queryString))
                        : this.cityAbroad;
                    cb(results);
                }
            },
            /* 计算两个经纬度之间距离 */
            designDistance(){
                if(this.latLngArr.length){
                    for(let i=0;i<this.latLngArr.length;i++){
                        if(this.latLngArr[i+1]){
                            this.latLngDistance[i]=this.latLngToKm(this.latLngArr[i],this.latLngArr[i+1]);
                        }else{
                            break;
                        }
                    }
                }else{
                    return
                }
            },
            /* 经纬度换算距离 */
            latLngToKm(obj_1,obj_2){
                var f = this.getRad((obj_1.lat + obj_2.lat)/2);
                var g = this.getRad((obj_1.lat - obj_2.lat)/2);
                var l = this.getRad((obj_1.lng - obj_2.lng)/2);
                
                var sg = Math.sin(g);
                var sl = Math.sin(l);
                var sf = Math.sin(f);
                
                var s,c,w,r,d,h1,h2;
                var a = 6378.1370;
                var fl = 1/298.257;
                
                sg = sg*sg;
                sl = sl*sl;
                sf = sf*sf;
                
                s = sg*(1-sl) + (1-sf)*sl;
                c = (1-sg)*(1-sl) + sf*sl;
                
                w = Math.atan(Math.sqrt(s/c));
                r = Math.sqrt(s*c)/w;
                d = 2*w*a;
                h1 = (3*r -1)/2/c;
                h2 = (3*r +1)/2/s;
                let v=d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
                let km=v ? `${v.toFixed(3)} km` :'暂无数据';
                return km;
            },
            getRad(d) {
                return d * Math.PI / 180.0;
            },
            // 航班弹框的出发和返回时间格式化
            departureTimeFormat (e) {
                let s = e.split(':')
                this.flightTabsModelData.departureHour = s[0]
                this.flightTabsModelData.departureMinute = s[1]
            },
            arrivalTimeTimeFormat (e) {
                let s = e.split(':')
                this.flightTabsModelData.arrivalHour = s[0]
                this.flightTabsModelData.arrivalMinute = s[1]
            },
            // 初始化添加航班信息的数据
            flightDataInit () {
                this.flightTabsModelData = {      // 航班信息需要添加的数据
                    shift: '',                      // 班次
                    cityStation: '',                // 出发城市
                    departureAirport: '',           // 出发机场
                    //departureTime: '',              // 出发时间
                    //departureHour: '',              // 出发小时
                    //departureMinute: '',            // 出发分钟
                    endCity: '',                    // 到达城市
                    endStation: '',                 // 到达机场
                    //arrivalTime: '',                // 到达时间
                    //arrivalHour: '',                // 到达小时
                    //arrivalMinute: '',              // 到达分钟
                    costPrice: ''                   // 花费
                }
            },
            // 航班信息的弹框点击确定
            flightDialogClickOk () {                
                for (let i in this.flightTabsModelData) {
                    if (!this.flightTabsModelData[i]) {
                        console.log(this.flightTabsModelData[i])
                        Message({
                            type: "error",
                            message: '请填写完整航班信息'
                        })
                        return false
                    }
                };
                let params={
                    type:3,//固定值
                    dayId :this.$store.getters.currentInfo.dayId
                }
                Object.assign(params,this.flightTabsModelData);
                //console.log('params',params);
                api.post('/trip/edit/addFlight', params).then((res) => {                   
                    this.flightDialogHidden()/* 航班弹框消失 */
                    // 新增加的航班信息添加到最后
                    res.item.flight.eventId=res.item.event.id;
                    res.item.flight.type=params.type;
                    this.tripData.flightList.push(res.item.flight);
                    console.log('resresres',this.tripData.flightList);
                    // 初始化航班信息(清空填写的内容)
                     this.flightDataInit()
                }).catch((err) => { 
                    new Error('添加航班信息错误', err)
                })
            },
            // 航班信息的弹框消失
            flightDialogHidden () {
                this.flightDialogVisible = false
            },
            /* 添加当日日记 */
            addDiary(){
                let params={
                    dayId:this.currentInfo.dayId,
                    travelDescription:this.diaryTxt,
                    title:this.diaryTitle
                }
                if(!this.diaryTitle){
                    Message({
                        type:'error',
                        message:"笔记标题不能为空"
                    })
                }else if(!this.diaryTxt){
                    Message({
                        type:'error',
                        message:"笔记内容不能为空"
                    })
                }
                api.post("/trip/edit/addDiary",params).then(res=>{
                   // console.log('res',res);
                  if(res.rescode=='200') this.tripData.fixed.remarks=params.travelDescription;this.tripSummary=params.title;
                    res&&res.rescode=='200'?Message({
                                                type:'seccess',
                                                message:res.resDescription
                                                }):Message({
                                                    type:'error',
                                                    message:"修改失败"
                                                })
                });
                this.diaryDialogVisible = false;
            },
            /* 查询当天的日记 */
            queryDiary(){
                api.post("/trip/edit/queryDiary",{dayId:this.currentInfo.dayId}).then(res=>{
                    console.log(res);
                    if(res.item){
                        this.diaryTxt=res.item.travelDescription;
                        this.diaryTitle=res.item.title;
                    }else{
                        return
                    }
                });
            },
            /* 数组去重 */
            ArrRemoveRepeat(arr){
                var hash = {}; 
                arr = arr.reduce(function(item, next) { 
                hash[next.a] ? '' : hash[next.a] = true && item.push(next); 
                return item 
                }, []);
            }
        },
        components: {
            HappyScroll,
            Message,
            draggable,
            googleMap,
            Dropdown,
            DropdownItem,
            DropdownMenu,
            elTag: tag,
            elInput: Autocomplete,
            elSelect: Select,
            elOption: Option,
            elDialog: Dialog,
            elButton: Button,
            elTabs: Tabs,
            elTabPane: TabPane,
            elDatePicker: DatePicker,
            elTimePicker: TimePicker,
            Popover,Loading
        }
    };
</script>
<style scoped lang="scss">
    //@import "../index.scss";
    @import "../../../../assets/css/color.scss";
    @import "./center.scss";
    
</style>
<style>

</style>

















