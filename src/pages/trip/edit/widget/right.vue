<template>
    <div :style="'height: ' + height + 'px;'">
        <popover ref="popRegionUse" placement="bottom" width="205" :value="popRegionUse" trigger="manual"
        content="这里是资源区可以查看、添加资源" popper-class="popover" :visible-arrow="false"></popover>

        <popover ref="popReferOtherTrip" placement="bottom" width="205" :value="popReferOtherTrip" trigger="manual"
        content="这里直接可以查看、复制行程" popper-class="popover" :visible-arrow="true"></popover>

        <popover ref="popAddView" placement="bottom-start" width="205" :value="popAddView" trigger="manual"
        content="点击可添加景点信息" popper-class="popover" :visible-arrow="true"></popover>

               
        <div class="rightpoiTop">
            <radio-group v-model="tabTitleIndex">
                <radio-button label="0" v-popover:popReferOtherTrip>经典路线</radio-button>
                <radio-button label="1">设计行程</radio-button>
                <radio-button label="2">产品采购</radio-button>
            </radio-group>
        </div>
        <div class="rightpoiContent">
            <!--经典路线下面的内容-->
            <div class="route" v-show="tabTitleIndex === '0'">
                <div v-if="isClassicRouteList">
                    <classicItem @addClassicItems="addClassicItems" :height="height" @classicDetail="classicDetailInfo" :classicRoute="classicItem"></classicItem>
                </div>
                <div class="noCity" v-else >
                    <img src="../images/noView.png" /> 
                    <span>当前城市暂无经典线路推荐</span>
                </div>
            </div>
            <!--设计行程下面的内容-->
            <div class="poiDesignTripWrap" v-show="tabTitleIndex === '1'" v-popover:popRegionUse>
                <!--行程设计下面的tab切换 -- 游玩 酒店 收藏-->
                <tabs v-model="designTripTab" key="designTripTab">
                    <tab-pane class="poiTabPane" label="游玩" name="0"  v-popover:popAddView>
                        <TopSearch
                            placeholder="搜索景点/体验/购物"
                            :type="tabType"
                            @search="searchDebounce">
                        </TopSearch>
                        <poiItem v-if="isPlayList"
                            :type="tabType"
                            :height="designTripComponHeight"
                            :useData="listData.poiPlay"
                            @clickListItem="showItemDetail"
                            @currentChange="pageChange"
                            @collect="collect"
                            @addItem="addPoiItem"
                            :pageNum="pageNum.poiPlay">
                        </poiItem>
                        <div class="noCity" v-else >
                            <img src="../images/noCity.png" /> 
                            <span>当前城市无此景点</span>
                        </div>
                    </tab-pane>
                    <!-- <tab-pane class="poiTabPane" label="酒店" name="1">
                        <TopSearch
                            placeholder="搜索酒店"
                        ></TopSearch>
                    </tab-pane> -->
                    <tab-pane class="poiTabPane" label="收藏" name="2">
                        <poiItem
                            :type="tabType" v-if="isCollectList"
                            :height="designTripComponHeight"
                            :useData="listData.poiCollect"
                            @clickListItem="showItemDetail"
                            @currentChange="pageChange"
                            @collect="collect"
                            @addItem="addPoiItem"
                            :pageNum="pageNum.poiCollect">
                        </poiItem>
                        <div class="noCity" v-else >
                            <img src="../images/noView.png" /> 
                            <span>暂无收藏景点信息</span>
                        </div>
                    </tab-pane>
                </tabs>
            </div>
            <!--产品采购下面的内容-->
            <div class="productSourcingWrap" v-show="tabTitleIndex === '2'">
                <tabs v-model="productSourcing" key="productSourcing">
                    <tab-pane class="poiTabPane" label="整体采购" name="0">
                        <!-- <TopSearch
                            placeholder="请输入整体采购">
                        </TopSearch> -->
                        <div class="poiTabPanePur" :style="'height: ' + height + 'px;'">
                            <img src="../images/purchase.png" />
                        </div>
                    </tab-pane>
                    <tab-pane class="poiTabPane" label="单次用车" name="1">
                        <!-- <TopSearch
                            placeholder="请输入单次用车">
                        </TopSearch> -->
                        <div class="poiTabPaneCar" :style="'height: ' + height + 'px;'">
                            <img src="../images/car.png" />
                        </div>
                    </tab-pane>
                    <tab-pane class="poiTabPane" label="酒店" name="2">
                        <!-- <TopSearch
                            placeholder="请输入酒店">
                        </TopSearch> -->
                        <div class="poiTabPaneHotel" :style="'height: ' + height + 'px;'">
                            <img src="../images/hotel.png" />
                        </div>
                    </tab-pane>
                    <tab-pane class="poiTabPane" label="门票" name="3">
                        <!-- <TopSearch
                            placeholder="请输入门票">
                        </TopSearch> -->
                        <div class="poiTabPaneTicket" :style="'height: ' + height + 'px;'">
                            <img src="../images/ticket.png" />
                        </div>
                    </tab-pane>
                </tabs>
            </div>
        </div>
        <poiDetailPopup :height="height" @addItem="addPoiItem" :idx="detailIndex" :show="detailPopup" :pageData="pageData" @close="detailPopup = false"></poiDetailPopup>
        <ball  ref='ball' :idx="poiAnimateIndex"></ball>
    </div>
</template>
<script>
    import api from '@/handler/tranfer'
    import debounce from '@/handler/debounce'
    import Pagination from '@/components/tripEdit/pagination.vue'
    import { Radio, RadioButton, Popover, RadioGroup, Tabs, TabPane, Message, Dropdown,  DropdownItem,MessageBox,  DropdownMenu } from 'element-ui'
    import poiDetailPopup from '@/components/tripEdit/detailPopup.vue'
    import TopSearch from '@/components/tripEdit/rightTopSearch.vue'
    import poiItem from '@/components/tripEdit/poiItem.vue'
    import classicItem from '@/components/tripEdit/classicItem.vue'
    import ball from '@/components/tripEdit/ball.vue'
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters(["currentInfo", "currentCityId","addView","showDetail","popoverEvery","travelId"]),
            designTripComponHeight(){
                return this.height-150
            },
            classicRouterComponHeight(){
                return this.height-50
            }
        },
        props:{
            height: {
            type: Number,
            default: 0
            },
        },
        data () {
            return {
                msg: '右侧的poi数据',
                tabTitleIndex: '1',    // 最顶层的tab切换的的index
                designTripTab: '0',  // 设计行程的tab切换的index
                productSourcing: '0',   // 产品采购的tab切换的index
                detailPopup: false,     // 是否显示详情弹框的判断
                detailIndex:'',
                pageData: {},           // 详情的数据
                judgePageChange: false, // 当搜索栏变化的请求数据的时候页码会随之变化，这个变量阻止页码变化而请求数据
                listData: {             // 页面需要的数据
                    poiPlay: {                // 游玩的poi数据
                        base: {},
                        list: []
                    },
                    poiHotel: {                // 酒店的poi数据
                        base: {},
                        list: []
                    },
                    poiCollect: {           // 收藏的数据
                        base: {},
                        list: []
                    },
                    classicRoute:{
                        base:{},
                        list:[]
                    }
                },
                classicItem:{
                    base:{},
                    list:[]
                },
                pageNum: {              // 所有列表的页码
                    poiPlay: 1,             // 游玩列表的页码
                    poiCollect: 1,
                    poiHotel:1,
                    classicItem:1           // 收藏的页码
                },
                searchVal: {           // 输入框内的内容
                    poiPlay: ''            // 游玩的搜索框内容
                },
                typeArr:['poiPlay','poiHotel','poiCollect'],
                isPlayList:1,
                isCollectList:1,
                isClassicRouteList:1,
                tabType:'poiPlay',
                //scrollOption: scrollConf(),
                classicRouteCommitTime:0,//经典行程提交次数
                popRegionUse:false,
                popReferOtherTrip:false,
                popAddView:false,
                addedListPosition:{},//列表坐标
                elPosition:{},//点击元素的坐标
                ballArr:[],//小球,
                poiAnimateIndex:11
            }
        },
        watch: {
            /* 切换最顶层的  tab */
            tabTitleIndex (val) {
                // 切换最外层的tab
                //console.log('切换最外层的tab',val);
                if(val==0) this.tabType='classicRoute'/* 等于0时，获取经典路线 */
                if(val==1) this.tabType='poiPlay'/* 等于1时，默认获取游玩数据 */           
            },
            /* 设计行程的切换 */
            designTripTab(a,b){
                if(a==2) this.tabType='poiCollect'/* 等于2时，获取收藏数据 */
                if(a==1) this.tabType='poiHotel'/* 等于1时，获取酒店数据 */
                if(a==0) this.tabType='poiPlay'/* 等于0时，获取酒店数据 */
            },
            /* 切换到当前类型时，如果列表里面没有存储，获取 */
            tabType(a,b){
                if(a && a!=b){
                    let target='get'+a.substring(0,1).toUpperCase()+a.substring(1);//首字母大写
                    this[target]()
                }
            },
            /* 监听当前日期的变化---获取最后一个城市的id */
            currentCityId (a,b) {
                //console.log('right-watch--currentCityId',a);
                if( a && a != b){
                    //console.log('监听当前日期的变化并获取最后一个城市的id',a,this.tabType);
                    let target='get'+this.tabType.substring(0,1).toUpperCase()+this.tabType.substring(1);//首字母大写
                    this[target]();
                    this.pageNum={
                        poiPlay: 1,             // 游玩列表的页码
                        poiCollect: 1,
                        poiHotel:1,
                        classicItem:1 
                    }
                    if(target!='poiPlay') this.getPoiPlay();
                }else{
                    this.isClassicRouteList=0;
                    this.isPlayList=0;
                }
            },
            addView(a,b){
                if(a.id!=b.id){
                    console.log('222222')
                    this.addPoiItem(a.type,a.id,0,a.index,a.ev);
                }else{
                    return
                }
            },
            showDetail(a,b){
                if(a.id!=b.id){ 
                    console.log('a.id,b.id',a.id,a.type)
                    this.showItemDetail(a.index,this.typeArr[a.type-1]);
                }else{
                    return
                }
            },
            popoverEvery(a,b){
                //console.log("right")
                let val=`pop${a.val}`;
                if(!this[val]){
                    this[val]=!this[val];
                setTimeout(()=>{this[val]=!this[val]},2000);
                }
            }
        },
        created  () {
            this.init();
        },
        methods: {
            // 初始化页面数据--右侧poi
            init () {
                this.getPoiPlay();
            },
            // poi列表数据变更或者切换的时候存到vuex，地图用
            poilistChangeToVuex (type, val) {
                let poiListInfo = []
                this.listData[type].list.map((item) => {
                    let member = {
                        type: item.type,
                        collection: item.collection,
                        title: item.cnName || item.enName,
                        axes: [item.latitude, item.longitude],
                        id: item.id,
                        starLevel: item.starLevel
                    }
                    poiListInfo.push(member);
                })
                this.$store.dispatch('poiListPosition', poiListInfo)
            },
            // 获取poi--游玩数据
            getPoiPlay () {
                const type = 'poiPlay'
                //type?type:this.tabType;
                this.listData[type].base=[];
                this.listData[type].list=[];
                let pageNum = this.pageNum[type]
                api.post('/trip/edit/getPlayList', {
                    type: type,
                    cityId: this.currentCityId,
                    travelId: this.travelId,
                    page: pageNum
                }).then((res) => {
                    this.listData[type].base = res.item
                    this.listData[type].list = res.items;
                    /* 有城市id时，在获取数据后提交vuex */
                    this.poilistChangeToVuex('poiPlay', this.listData['poiPlay'].list);
                    this.listData['poiPlay'].list.length?this.isPlayList=1:this.isPlayList=0;
                    return res;
                }).catch(err => {
                    new Error(404, '搜索' + type + 'pio失败')
                })
            },
            // 获取收藏列表数据
            getPoiCollect () {
                const type = 'poiCollect';
                api.post('/trip/edit/getCollectList', {
                    page: this.pageNum[type],
                    travelId:this.travelId
                }).then((res) => {
                    //console.log('获取收藏列表数据',this.tabType,res)
                    let poiCollectItem = []
                    res.items.map((val, index, arr) =>{
                        poiCollectItem.push(val.poiFocus)
                    })
                    this.listData[type].base = res.item || {}
                    this.listData[type].list = poiCollectItem;
                    this.listData[type].list.length?this.isCollectList=1:this.isCollectList=0;
                }).catch(err => {
                    new Error(404, '获取收藏列表失败')
                })
            },
            // 搜索的请求
            searchPoi (type) {
                let name = this.searchVal[type]
                let pageNum = this.pageNum[type]
                api.post('/trip/edit/searchPoi', {
                    type: type,
                    cityId: this.currentCityId,
                    travelId: this.travelId,
                    page: pageNum,
                    name: name
                }).then((res) => {
                    this.listData[type].base = res.item
                    this.listData[type].list = res.items
                    this.listData[type].list.length?this.isPlayList=1:this.isPlayList=0;
                }).catch(err => {
                    new Error(404, '搜索' + type + 'pio失败')
                })
            },
            /* 添加之前先判断列表里是否存在---(预留判断酒店、收藏、经典线路，共同使用此方法) */
            isExist(params,url){
                return new Promise((resolve,reject)=>{
                    api.post('/trip/edit/'+url, params).then((res) => {
                       // console.log('isExist',res.item.code);
                        if(res.item.code){
                            MessageBox.confirm('今日行程中已存在此信息，是否继续添加?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning',
                            }).then(()=>{
                                resolve(0); 
                            })
                        }else{
                            resolve( 0 )
                        }
                    }).catch(err => {
                        reject(err);
                    });
                })
                
            },
            // 右侧列表的poi资源添加  加号点击添加
            addPoiItem(poiType,id,collectType, index,ev,cityId) {
                this.isExist({dayId: this.currentInfo.dayId,productId: id},'isExistPoi').then( result =>{
                   // console.log('isExist>>>',result);
                    if(!result){
                        this.addPoiToList(poiType,id,collectType, index,ev,cityId)
                    }
                }).catch(err => {
                    //console.log(err);
                    new Error(404, '搜索' + err + 'pio失败')
                });
            },
            addPoiToList(poiType,id,collectType, index,ev,cityId){
                //console.log('right-addPoiItem',poiType,id,collectType,index,cityId);
                let type = this.typeArr[poiType-1];
                api.post('/trip/edit/addPoiToList', {
                    type: poiType,
                    dayId: this.currentInfo.dayId,
                    productId: id
                }).then((res) => {
                    //console.log('addPoiToCenter',res);
                    let p = this.listData[type].list[index];
                    p.eventId = res.item.id;
                    this.$store.dispatch('addPoiToCenterList', p);
                    this.$refs.ball.getAnimateTarget(ev);
                    Message({
                        type: "success",
                        message: "操作成功，当前景点已添加至列表"
                    })
                }).catch(err => {
                    new Error(404, '添加' + type + 'pio失败')
                })
            },
            /* 经典线路添加到---中间列表 */
            addClassicItems(item,ev){
                //console.log(' 经典线路添加到---中间列表 ',item,item.info[1]);
                let params={
                    dayId:this.currentInfo.dayId,
                    classicTripDayId:item.info[0].dayId//poiDayId  在经典线路下的每一天都存在且一致
                }
                api.post("/trip/edit/addClassicTrip",params).then(res=>{
                   // console.log('经典线路添加到---中间列表',res)
                    if(res.rescode=='200'){
                        //this.$refs.ball.getAnimateTarget(ev);
                        /* 返回的是当前中间列表的所有eventId */
                        let arr=[];
                        res.items.map(resItem=>{
                            arr.push(resItem.id)
                        });
                        let newArr=arr.splice(arr.length-item.info.length,item.info.length);
                        for(let i=0;i<item.info.length;i++){
                            let commitItem={
                                latitude:item.info[i].latitude,
                                longitude:item.info[i].longitude,
                                cnName:item.info[i].cnName,
                                enName:item.info[i].enName,
                                id:item.info[i].id,
                                type:item.info[i].type,
                                eventId:newArr[i]
                            };
                            this.$store.dispatch('addClassicToCenterList', commitItem);
                        }
                    }
                })
            },
            // 搜索--防抖
            searchDebounce:debounce(function(val,type){
                this.searchVal[type] = val
                this.pageNum[type] = 1
                this.judgePageChange = true
                if(val){
                    this.searchPoi(type);
                }else{
                    this.getPoiPlay();
                }
            },500),
            // 点击右侧的列表中的每一项，弹出详情
            showItemDetail (index, type) {
                console.log('right---showItemDetail',index,type)
                this.detailPopup = true;
                this.detailIndex=index;
                this.pageData = this.listData[type].list[index]
            },
            /* 经典路线的详情信息 */
            classicDetailInfo(id){
                console.log('经典路线的详情信息',id)
                let index=this.idExchangeForIndex(this.listData.classicRoute.list,id);
                this.showItemDetail(index,'classicRoute');
            },
            // 页码发生变化的时候
            pageChange (type, index) {
                if (this.judgePageChange) {
                    this.judgePageChange = !this.judgePageChange
                    return false
                };
                this.pageNum[type] = index;
                /* 输入框有内容说明是，搜索翻页，否则根据查询的type值确认获取对应的数据 */
                if (this.searchVal[type]) {
                    this.searchPoi(type)
                } else {
                    let target='get'+type.substring(0,1).toUpperCase()+type.substring(1);//首字母大写
                    this[target]();
                }
            },
            // 收藏和取消收藏的时候
            collect (id, index, collection, poiType) {
                //console.log('收藏和取消收藏的时候',id, index, collection, poiType)
                api.post('/trip/edit/collect', {
                    type: poiType,
                    focusId: id,
                    travelId:this.travelId
                }).then((res) => {
                    //const t = poiType ? 'poiPlay' : 'poiPlay'
                    /* 点击收藏之后，查看当前在什么类型的列表（在非收藏列表） */
                    if (this.tabType !== 'poiCollect') {
                        //console.log('rew',res,this.tabType,collection);
                        /* 非收藏列表的动作 */
                        if(Number(collection)==1){
                            this.listData[this.tabType].list[index].collection = 0;
                            Message({
                                type: "success",
                                message: "取消收藏成功"
                                })
                        }else{
                            this.listData[this.tabType].list[index].collection = 1;
                            Message({
                                type: "success",
                                message: "收藏成功"
                                })
                        }
                        this.$set(this.listData[this.tabType].list, index, this.listData[this.tabType].list[index]);
                        //console.log('this.listData.poiPlay.list[index]',this.listData[this.tabType].list[index])
                        /* 收藏列表的动作，点击收藏按钮之后，如果之前已经查看过且没有收藏，添加到列表头部,否则不过是否收藏都重新获取列表 */
                        this.listData['poiCollect'].list.length&&!this.isCollectPoi(this.tabType,id)
                        ? this.listData['poiCollect'].list.unshift(this.listData[this.tabType].list[index])
                        : this.getPoiCollect();
                        /* 在收藏列表 */
                    }else if(this.tabType == 'poiCollect'){
                        /* 在收藏列表时，点击收藏按钮之后，添加到列表头部否则重新获取列表 */
                        this.listData['poiCollect'].list.splice(index,1);
                        /* 取消收藏后，可以直接改变对应的poi数组下标的 collection 值 ，但是此时无法判断点击的是什么类型（酒店?游玩？）的poi，
                        所以只能重新获取  或者根据id查找取消收藏的是，酒店还是游玩*/
                        this.cancelPlayOrHotelCollect(this.typeArr[poiType-1],id);
                    }
                }).catch(err => {
                    new Error(404, !collection ? '收藏失败' : '取消收藏失败')
                })
            },
            /* 取消收藏的酒店或游玩 */
            cancelPlayOrHotelCollect(cancelType,id){
                for(let i=0;i<this.listData[cancelType].list.length;i++){
                     if(this.listData[cancelType].list[i].id==id){
                        this.listData[cancelType].list[i].collection=0;
                        break;
                    }
                }
            },
            /* 是否收藏过当前poi,  已收藏返回1，未收藏返回0 */
            isCollectPoi(testType,id){
                for(let i=0;i<this.listData[testType].list.length;i++){
                     if(this.listData[testType].list.id=id){
                        return 1;
                    }else{
                        return 0;
                    }
                }
            },
            /* 获取经典路线信息 */
            getClassicRoute(){
                let params={
                    cityId:this.currentCityId
                }
                api.post('/trip/edit/getClassicList',params).then(res=>{
                    if(res.rescode){
                        if(res.items.length) this.filterClassicRouteData(res.items),this.classicItem.base=res.item.customTravel;;
                        res.items.length?this.isClassicRouteList=1:this.isClassicRouteList=0;
                    }
                })
            },
            filterClassicRouteData(data){
                let allTripArr=[],everyTripObj={};
                    // 第一次循环添加每一个行程的行程名称和行程Id
                    for(let i=0;i<data.length;i++){
                        let allPoiArr=[];
                        let item_1=data[i];
                        //第二次循环  dayVoForPdf  取出 每一个行程下面的所有天
                        for(let j=0;j<item_1.dayVoForPdf.length;j++){
                            let poiItemArr =[];
                            let item_2=item_1.dayVoForPdf[j];
                            if(item_2.eventVoList){
                                // 第三次  eventVoList  取出每一天下面的poi
                                for(let k=0;k<item_2.eventVoList.length;k++){
                                    let item_3=item_2.eventVoList[k].poi;
                                    //console.log(item_2.eventVoList[k],item_3)
                                    if(item_3){
                                        //let name=item_3.cnName?item_3.cnName:item_3.enName
                                        poiItemArr[k]={
                                            "cnName":item_3.cnName?item_3.cnName:item_3.enName,
                                            "enName":item_3.enName,
                                            "id":item_3.id,
                                            "type":item_3.type,
                                            "latitude":item_3.latitude,
                                            "longitude":item_3.longitude,
                                            "dayId":item_2.eventVoList[k].event.dayId,
                                            "eventId":item_2.eventVoList[k].event.id
                                            }
                                            this.listData.classicRoute.list.push(item_3);
                                    }else{
                                        //console.log("1111111");
                                        continue;
                                    }
                                }
                                allPoiArr.push(poiItemArr);
                            }
                        }
                        everyTripObj={
                            'tripName':item_1.customTravel.travelName,
                            'tripId':item_1.customTravel.id,
                            'tripUrl':item_1.customTravel.url,
                            'poiInfo':allPoiArr
                        }
                        allTripArr.push(everyTripObj);
                        //console.log('allTripArr',allTripArr);
                    }
                    this.classicItem.list=allTripArr;
            },
            idExchangeForIndex(arr,id){
               for(let i=0;i<arr.length;i++){
                    if(arr[i].id==id){
                        return i;
                    };
 	            }
            }
        },
        components: {
            Tabs, TabPane, poiItem, TopSearch, Radio, RadioButton, RadioGroup, poiDetailPopup, Pagination,
            Dropdown, DropdownItem, DropdownMenu,classicItem,Popover,ball
        }
    }
</script>
<style scoped lang="scss">
@import "../../../../assets/css/color.scss";
//@import "right.scss";

.rightpoiTop {
  height: 50px;
  z-index: 10;
  position: relative;
}
.rightpoiContent {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 50px;
  .poiDesignTripWrap,
  .productSourcingWrap {
    position: relative;
    height: 100%;
    .poiPlay {
      height: 100%;
    }
  }
}
.poiPlayCentent {
  height: 100%;
}
// 详情的弹出层样式和动画
/* .detailPopup {
  width: 100%;
  height: 100%;
  background: $_fontf;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: translateX(0);
} */
.detailPopup-enter-active,
.detailPopup-leave-active {
  transition: all 0.5s;
}
.detailPopup-enter,
.detailPopup-leave-to {
  transform: translateX(100%);
}
//没有城市
.noCity {
  text-align: center;
  img {
    margin: 50% auto 5px;
    width: 50px;
    height: 60px;
  }
  span {
    font-size: 14px;
    color: #999;
  }
}
.poiTabPanePur,
.poiTabPaneCar,
.poiTabPaneTicket,
.poiTabPaneHotel {
  width: 100%;
  img {
    width: 100%;
  }
}
.expandContent:hover {
  color: #fd9600;
}
</style>
