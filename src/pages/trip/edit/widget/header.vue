<template>
    <div class="tripEditHeader clearfix">
        <!-- 所有popover弹框在最上面、dialog模态框在最下面 -->
        <popover  ref="remarkPopover" placement="bottom-start"  title="备注" trigger="hover" width="400">
            <div class="orderRemark">
                <div class="orderRemarkText" v-if="remarks">{{remarks}}</div>
                <div class="orderRemarkText" v-else style="color:#999">您还未添加备注信息</div>
                <div class="orderRemarkEdit" @click="orderRemarkDialog = true">点击修改内容</div>
            </div>
        </popover>
        <popover ref="popUpdataTitle" placement="bottom" width="205" :value="popUpdataTitle" trigger="manual"
        content="点击标题 或 人数即可修改" popper-class="popover"></popover>
        <popover ref="popLookAccountInfo" placement="bottom" width="205" :value="popLookAccountInfo"
        content="这里查看账号信息" popper-class="popover" trigger="manual"></popover>
        <popover ref="popPreview" placement="bottom" width="50" :value="popPreview" trigger="manual"
        content="点击预览行程" popper-class="popover"></popover>
        <popover ref="popShapeTrip" placement="bottom" width="205" :value="popShapeTrip"
        content="点击分享行程" popper-class="popover" :visible-arrow="true" trigger="manual"></popover>      
        <!--logo-->
        <div class="logo fl" @click="backManage" ></div>
        <!--中间的文字-->
        <div class="headerCenter fl">
            <div class="centerText" v-popover:popUpdataTitle>
            <!--标题的提示文字-->
                <div></div>
                <div class="centerText_left">
                    <div class="editTitleText">
                        <span v-if="!editTitleBlog">{{ titleText }}</span>
                        <!-- <div class="editTitle" v-if="!!editTitleBlog"> -->
                            <!-- <input type="text" v-model="titleText" v-focus="!!editTitleBlog"> -->
                            <!-- <div class="editTitleButton editTitleOk fr" @click.stop="editTitleOk">确定</div>
                            <div class="editTitleButton editTitleCancel fr" @click="editTitleCancel">取消</div>
                        </div> -->
                    </div>
                    <span>　|　</span>
                    <div class="editTitleText editPeopleNumber" @click.stop="adultStatus = true">
                        <span>成人</span><span>{{this.adultNum}}</span>
                            <!--成人人数的input-->
                        <!-- <input v-model="adultNum" v-if="!!adultStatus" v-focus="!!adultStatus" class="editPeopleNumberInput"
                                type="text" > -->
                    </div>
                    <div class="editTitleText editPeopleNumber" @click.stop="childStatus = true">
                        <span>儿童</span><span>{{this.childrenNum || 0 }}</span>
                            <!--儿童人数的input-->
                        <!-- <input v-model="childrenNum" v-if="!!childStatus" v-focus="!!childStatus" class="editPeopleNumberInput"
                                type="text" > -->
                    </div>
                    <div class="remark" v-popover:remarkPopover @click="orderRemarkDialog = true"></div>
                    <div class="revise_msg" @click="orderReviseMsg = true">修改</div>
                </div>
                <div class="centerText_right">
                    <div class="fly_add" @click="add_flight">添加航班</div>
                    <div class="preview trip_add" @click="previewDialog= true" v-popover:popPreview>预览行程</div>
                </div>
            <!--备注的提示框-->
            </div>
        </div>
        <!--右侧的功能按钮-->
        <ul class="rightText fr">
            <li class='help_text' @click="helpCenterDialog = true;suggestText='' ">帮助</li>
            <li>
                <div class="helpCenter"></div>
                <!--常见问题的dialog弹框-->
                <el-dialog
                    class="helpCenterDialog"
                    title="常见问题"
                    :visible.sync="helpCenterDialog"
                    width="950px"
                    :append-to-body="true"
                    :show-close="true"
                >
                    <div class="helpCenterDialogContent">
                        <ul class="clearfix issuseContent">
                            <li class="issueItem clearfix">
                                <span @click="promptGuide('RegionUse')">当前界面各区域是做什么的？</span>   
                                <span @click="promptGuide('TrimDate')">如何调整景点或日期的顺序？</span>   
                                <span @click="promptGuide('UseMap')">如何使用地图？</span>   
                            </li>
                            <li class="issueItem clearfix">
                                <span @click="promptGuide('UpdataCity')">如何修改当天城市？</span>   
                                <span @click="promptGuide('AddDiray')">如何添加笔记？</span>   
                                <span @click="promptGuide('Preview')">如何快速进行预览？</span>   
                            </li>
                            <li class="issueItem clearfix">
                                <span @click="promptGuide('UpdataTripDate')">如何修改行程日期？</span>   
                                <span @click="promptGuide('AddView')">如何添加景点信息？</span>   
                                <span @click="promptGuide('SaveTrip')">如何保存行程？</span>   
                            </li>
                            <li class="issueItem clearfix">
                                <span @click="promptGuide('UpdataTripDay')">如何修改行程天数？</span>   
                                <span @click="promptGuide('UpdataTitle')">如何修改行程标题/人数？</span>   
                                <span @click="promptGuide('ShapeTrip')">如何分享行程给他人？</span>   
                            </li>
                            <li class="issueItem clearfix">
                                <span @click="promptGuide('ReferOtherTrip')">如何参考别人做的行程？</span>   
                                <span @click="promptGuide('LookAccountInfo')">如何查看账号信息？</span>   
                            </li>
                        </ul>
                        <!-- <div class="useGuide">在操作中遇到任何问题，欢迎查看《<span>中国旅游服务平台使用指南</span>》</div> -->
                        <div class="feedback">
                            <div class="backTitle">若还有其他问题或建议，请您私信给我们，我们会尽快答复给您</div>
                            <div class="suggest">
                                <textarea placeholder="请描述您的问题和操作步骤" v-model="suggestText" maxlength="500"></textarea>
                            </div>
                            
                            <div class="issueFoot clearfix">
                                <span class="textLimit fl">{{ suggestText.length }}/500字</span>
                                <span @click="issueSubmit" class="issueSubmit">提交</span>
                            </div>
                        </div>
                    </div>
                </el-dialog>
            </li>
            <li class="rightTextLine"></li>
            <!-- <li class="preview">  </li> -->
            <!-- <li class="rightTextLine"></li> -->
            <!--分享的-->
            <!-- <li v-popover:popShapeTrip>
                <popover
                    ref="sharePopover"
                    placement="bottom-end"
                    width="235"
                    trigger="hover"
                    transition=""
                >
                    <div class="sharePopover clearfix">
                        <img class="sharePopoverQRcode fl" src="http://www.liantu.com/images/2013/weixin.png" alt="">
                        <div class="sharePopoverLine fl"></div>
                        <div class="sharePopoverText fl">
                            <div class="sharePopoverWeibo">微博分享</div>
                            <div class="sharePopoverHttp">链接分享</div>
                        </div>
                        <div class="sharePopoverBottom fl">扫一扫，分享给微信/QQ好友</div>
                    </div>
                </popover>
                <div class="share" v-popover:sharePopover>分享</div>
            </li> -->
            <!-- <li class="rightTextLine"></li>
            <li>
                <dropdown
                    class="fr"
                    trigger="click"
                    :show-timeout="0"
                    :hide-timeout="0"
                    placement="bottom-start"
                    @command="purchaseItemClick"
                    @click.native.stop=""
                >
                    <div class="purchase">一键采购</div>
                    <dropdown-menu slot="dropdown">
                        <dropdown-item command="">整体采购</dropdown-item>
                        <dropdown-item command="">报价单</dropdown-item>
                        <dropdown-item command="">提交订单</dropdown-item>
                    </dropdown-menu>
                </dropdown>
            </li>
            <li class="rightTextLine"></li> -->
            <!--头像的下拉框-->
            <li v-popover:popLookAccountInfo>
                <dropdown
                    class="fr"
                    trigger="click"
                    :show-timeout="0"
                    :hide-timeout="0"
                    placement="bottom-start"
                    @command="personalCenterItemClick"
                >
                    <div class="headerImh" >
                        <!-- <img src="../images/img_toux.png" alt="" v-if='!member.logoImg'> -->
                        <img :src="member.logoImg" alt="" >
                    </div>
                    <dropdown-menu slot="dropdown" style="text-align: center ">
                        <dropdown-item command="creatTrip">创建行程</dropdown-item>
                        <dropdown-item command="manage">我的行程</dropdown-item>
                        <dropdown-item command="">我的订单</dropdown-item>
                        <!-- <dropdown-item command="">个人中心</dropdown-item> -->
                        <dropdown-item command="manageSet">设置</dropdown-item>
                        <dropdown-item command="login">退出</dropdown-item>
                    </dropdown-menu>
                </dropdown>
            </li>
        </ul>
        <el-dialog class="tripBookDialog"
            title="扫码/查看后可分享给客户"
            :visible.sync="previewDialog" append-to-body
            width="50%">
            <div class="clearfix" style="padding: 0 100px;">
                <div class="QRcode fl">
                    <!-- <img src="http://www.liantu.com/images/2013/weixin.png"/> -->
                     <!-- <qart  class="moblieQR"></qart> -->
                    <QrCode class="moblieQr" :value="moblieUrl"></QrCode>
                    <!-- <canvas id="canvas"></canvas> -->
                    
                    <span class="moblieQRcode">扫描二维码查看手机版路书</span>
                </div>
                <div @click="previewBook" class="pcQRcode fl">s
                    <i class="pcImg" alt=""></i>
                    <span>点击查看电脑版路书</span>   
                </div>
                 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="previewDialog = false">取 消</el-button>
                <el-button type="primary" @click="previewDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!--修改备注的dialog弹框-->
        <el-dialog
                title="请修改备注内容"
                :visible.sync="orderRemarkDialog"
                width="30%"
                :append-to-body="true"
                :show-close="false"
            >
            <div class="orderRemarkEditDialogTextarea">
                <textarea v-model="remarks" v-focus="orderRemarkDialog"></textarea>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="orderRemarkDialog = false">取 消</el-button>
                <el-button type="primary" @click="editRemarkOk">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :visible.sync="orderReviseMsg"
            width="50%"
            :append-to-body="true"
            >
            <div class="reviseMsg_top">
                <div class="top_p">
                    <p>行程名称</p>
                    <input type="text" v-model="copyTitle" @change="textBlur">
                </div>
                <div class="choose_num">
                    <div class="precent_num">
                        <input type="number" min="1" v-model="tripAdult_pre" class='num_input'  @change="adultBlur">
                        <span>成人</span>
                    </div>
                    <div class="children_num">
                        <input type="number" min="0" v-model="tripAdult_child" class='num_input' @change="childBlur">
                        <span>儿童</span>
                    </div>
                </div>
            </div>
            <div class="reviseMsg_bot">
                <p>添加备注</p>
                <input type="text" v-model="remarks" @change="remarkBlur">
            </div>
            <div class="btn_sess">
                <div></div>
                <div>
                    <el-button @click="orderReviseMsg = false">取 消</el-button>
                    <el-button type="primary" @click="$_fetchData">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="添加航班信息"
            :visible.sync="flightDialogVisible"
            :append-to-body="true" :center="true"
            :show-close="true"
            width="950px"
            class="flightDialog"
            >
            
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
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Tooltip, Popover, Dialog, Button, Dropdown, DropdownItem, DropdownMenu,Message, InputNumber,DatePicker,TimePicker } from 'element-ui'
    import api from "@/handler/tranfer";
    import { mapGetters } from 'vuex';
    import QrCode from '@xkeshi/vue-qrcode';
    Vue.use(Popover)
    // 自动获取焦点
    /* Vue.directive('focus', {
        inserted: function (el) {
            // 聚焦元素
            el.focus()
        },
    }); */
    export default {
        computed: {
          ...mapGetters(["travelId","tripInfo","popoverEvery","currentInfo"])  
        },
        data () {
            return {
                msg: '行程编辑的头部',
                editTitleBlog: false,
                titleText: '',
                copyTitle:'',/* title 副本，点击取消时，使用 */
                adultNum: 1, // 成人初始值 watch
                childrenNum: 1, // 儿童改变后的值
                suggestText: '',
                adultStatus: false,
                childStatus: false,
                orderRemarkDialog: false,
                helpCenterDialog: false,
                remarks:'',
                previewDialog:false,
                moblieUrl:'',
                popUpdataTitle:false,
                popLookAccountInfo:false,
                popPreview:false,
                popShapeTrip:false,
                orderReviseMsg: false,// 订单修改弹框
                tripAdult_child: 0, // 儿童的初始值
                tripAdult_pre: 1, // 成人的初始值
                flightDialogVisible: false, // 默认航班的初始值
                flightTabsModel: '2',/* 航班默认选项--（没有查询接口） */
                departureTime: '',                  // 这个日期需要处理才能添加到flightTabsModelData
                arrivalTime: '',                     // 这个日期需要处理才能添加到flightTabsModelData
                flightTabsModelData: {},
            }
        },
        props: {
            member: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        watch: {
            /* adultNum (val) {
                // 修改成人数量
                this.adultNum = this.computerNum(val)
            },
            childrenNum (val) {
                // 修改儿童数量
                this.childrenNum = this.computerNum(val)
            },*/
            tripInfo(a){
                //console.log(a)
                this.adultNum=a.adultNum
                this.childrenNum=a.childrenNum
                this.remarks=a.remarks,
                this.titleText=a.travelName
            },
            popoverEvery(a,b){
                //console.log("header")
                let val=`pop${a.val}`;
                if(!this[val]){
                    this[val]=!this[val];
                setTimeout(()=>{this[val]=!this[val]},10000);
                }
            }
        },
        mounted () {
            this.tripAdult_child = this.childrenNum;
            this.tripAdult_pre = this.adultNum;
            this.$nextTick(function () {
            // DOM操作
            this.moblieUrl='http://114.112.69.204:8080/#/?travelId='+this.travelId;        　　　　 
            })
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            editTitleOk () {
                // 修改标题完事，需要提交请求
                //console.log(123);
                this.$_fetchData();
            },
            computerNum (c) {
                // 修改团人数的计算函数
                let n = Number(String(c).replace(/\D*/g, ''))
                if (n > 99) n = 99
                if (n< 1) n = 1
                return c
            },
            adultBlur (e) {
                this.tripAdult_pre = e.target.value
                // 修改成人数量的输入框失去焦点，保存数据
                /* this.adultStatus = false; */
            },
            childBlur (e) {
                // 修改儿童数量的输入框失去焦点，保存数据
                /* this.childStatus = false;
                this.$_fetchData(); */
                this.tripAdult_child = e.target.value
            },
            textBlur (e) {
                this.copyTitle = e.target.value
            },
            remarkBlur (e) {
                this.remarks_text = e.target.value
            },
            editRemarkOk () {
                // 修改备注点击确定的时候
                this.orderRemarkDialog = false;
                //console.log(this.remarks)
                this.$_fetchData();
            },
            editTitleCancel(){
                //console.log('11111111')
                // 修改备注点击取消的时候
                this.editTitleBlog = !this.editTitleBlog;
                this.titleText=this.copyTitle;
            },
            personalCenterItemClick (href) {
                // 头像位置的下拉框每一项的点击，参数是command的内容
                //console.log('cccc',href);
                this.$router.push({name:href});
                if(href=='login'){
                    api.post("/login/userInfo",{logout:true}).then(res=>{
                        if(res.rescode=='200'){
                            this.$store.dispatch("logout");
                        }
                    })
                }
            },
            purchaseItemClick (c) {
                // 一键采购下拉框每一项的点击，参数是command的内容
            },
            previewBook(){
                window.open(`http://114.112.69.204:8061/book/index?travelId=${this.travelId}`)
                /* window.open(`http://192.168.8.121:8090/book/index?travelId=${this.travelId}`) */
            },
            $_fetchData(){
                this.childrenNum = this.tripAdult_child;
                this.adultNum = this.tripAdult_pre;
                this.titleText = this.copyTitle;
                this.remarks = this.remarks_text;
                let params={
                    travelName:this.titleText,
                    travelId:this.travelId,
                    adultNum:this.adultNum,
                    childrenNum:this.childrenNum,
                    remarks:this.remarks
                };
                if(!this.titleText){
                    Message({
                        type:'error',
                        message:"行程名称不能为空"
                    });
                }else if(this.copyTitle===this.titleText){
                    this.editTitleBlog=false;
                }else if(params.adultNum<=0){
                    Message({
                        type:'error',
                        message:"成人数量不能小于0"
                    });
                }
                api.post("/trip/edit/updateTripDateInfo",params).then(res=>{
                    if(res.rescode=='200'){
                        Message({
                            type:'success',
                            message:"修改成功"
                            });
                            this.orderReviseMsg=false;
                    }else{
                        Message({
                            type: "success",
                            message:"修改失败"
                        });
                    }
                })
                
            },
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
            // 点击添加航班
            add_flight () {
                this.flightDialogVisible = true; 
                this.queryDiary()
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
             /* 查询当天的日记 */
            queryDiary(){
                api.post("/trip/edit/queryDiary",{dayId:this.currentInfo.dayId}).then(res=>{
                    if(res.item){
                        this.diaryTxt=res.item.travelDescription;
                        this.diaryTitle=res.item.title;
                    }else{
                        return
                    }
                });
            },
            // 航班信息的弹框消失
            flightDialogHidden () {
                this.flightDialogVisible = false
            },
            issueSubmit(){
                //console.log("afsgfdg")
                let params={
                    feedbackName:this.suggestText
                }
                if(this.suggestText){
                    api.post("/trip/edit/feedback",params).then(res=>{
                        //console.log(res)
                        if(res.rescode=='200'){
                            Message({
                                type:'success',
                                message:"提交成功，我们会尽快给您答复"
                                });
                                this.helpCenterDialog=false;
                        }else{
                            Message({
                                type: "error",
                                message:"提交失败，请重试"
                            });
                        }
                    })
                }else{
                    Message({
                        type: "error",
                        message:"提交内容不能为空"
                    });
                }
            },
            promptGuide(item){
                //console.log(item);
                this.helpCenterDialog=!this.helpCenterDialog;
                this.$store.dispatch('popoverEvery',item)
            },
            backManage(){
                this.$router.push('/manage/myTrip')
            }
        },
        components: {
            Tooltip, Popover, elDialog: Dialog, elButton: Button, Dropdown, DropdownItem, DropdownMenu,Message,QrCode,elInputNumber:InputNumber,elDatePicker: DatePicker,elTimePicker: TimePicker,
            
        }
    }
</script>
<style scoped lang="scss">
@import "../../../../assets/css/color.scss";
@import "./center.scss";
    //@import "header.scss";
    .headerCenter{
        width: 72%;
        height: 100%;
        text-align: center;
        margin: 0 auto;
    }
    .revise_msg{
        width: 50px;
        height: 25px;
        border: 1px solid #1594E3;
        border-radius: 4px;
        font-size: 12px;
        color: #1493E3;
        line-height: 23px;
        margin-left: 16px;
    }
    .reviseMsg_top{
        display: flex;
        align-items: center;
    }
    .reviseMsg_bot{
        display: flex;
        margin-top: 40px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ABA8A8;
    }
    .reviseMsg_bot input{
        width: 500px;
        margin-left: 5px;
    }
    .top_p{
        display: flex;
        flex: 2;
        border-bottom: 1px solid #ABA8A8;
        padding-bottom: 5px;
    }
    .top_p input{
        margin-left: 5px;
    }
    .num_input{
        width: 81px;
        text-align: center;
    }
    .choose_num{
        display: flex;
        margin-left: 30px;
    }
    .children_num, .precent_num{
        display: flex;
        border-bottom: 1px solid #ccc;
    }
    .children_num{
        margin-left: 20px;
    }
    .btn_sess{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    .el-input-number{
        width: 80px;
    }
    .fly_add{
        margin-right: 40px;
    }
    .fly_add,.trip_add{
        width: 80px;
        height: 30px;
        line-height: 27px;
        border-radius: 4px;
        border: 1px solid #FD9600;
        font-size: 14px;
        color: #FD9600;
    }
    .tripEditHeader{

    .logo{
        width: 147px;
        height: 28px;
        display: inline-block;
        background: url("../images/logo.png") center no-repeat;
        background-size: 100% 100%;
        transform: translate(0, 50%);
        cursor: pointer;
    }
    .centerText_right, .centerText_left{
        display: flex;
    }
    .centerText_left{
        margin-left: 150px;
    }
    .centerText{
        //position: absolute;
        //top: 30%;
        font-size: 16px;
        display: inline-block;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        //left: 50%;
        //transform: translate(-50%, 0);
        .text{
            height: 100%;
            >span{
                line-height: 60px;
            }
        }
        .remark{
            width: 12px;
            height: 14px;
            background: url("../images/icon_remark.png") right center no-repeat;
            background-size: 12px 14px;
            transform: translate(0, 30%);
            margin-left: 10px;
            cursor: pointer;
            margin-bottom: 8px;
        }
    }
    .rightText{
        height: 100%;
        font-size: 14px;
        >li{
            float: left;
            position: relative;
            top: 50%;
            transform: translate(0, -50%);
            cursor: pointer;
        }
        .preview{
            border: 1px solid #1a96e4;color: #1a96e4;
            padding: 6px 22px;
            border-radius: 4px;
        }
        .rightTextLine{
            width: 1px;
            height: 11px;
            margin: 0 15px;
            border: 1px solid $_borderMain;
        }
        .helpCenter{
            width: 20px;
            height: 20px;
            background: url("../images/icon_help.png") center no-repeat;
            margin-right: 10px;
        }
        .share{
            padding-right: 15px;
            background: url("../images/icon_arrowBottom_999.png") right center no-repeat;
            background-size: 8px 5px;
        }
        .purchase{
            padding: 7px 35px 7px 18px;
            border: 1px solid $_colorAid;
            color: $_colorAid;
            border-radius: 4px;
            font-size: 12px;
            background: url("../images/icon_arrowBottom_1493e3.png") 76px center no-repeat;
            background-size: 8px 5px;
        }
        .headerImh{
            padding-right: 13px;
            background: url("../images/icon_arrowBottom_999.png") right center no-repeat;
            background-size: 8px 5px;
            img{
                width: 36px;
                height: 36px;
                border-radius: 50%;
            }
        }
    }
}
.orderRemarkEditDialogTextarea{
    width: 100%;
    height: 120px;
    padding: 10px;
    border: 1px solid $_colorMain;
    border-radius: 5px;
    textarea{
        width: 100%;
        height: 100%;
        border: none;
        resize: none;
        overflow: visible;
    }
}
.editTitleText{
    display: inline-block;cursor: pointer;
}
.editTitle{
    width: 288px;
    height: 100%;cursor: pointer;
    input{
        padding: 5px 10px;
        border: 1px solid $_colorMain;
        border-radius: 5px;
        width: 200px;
    }
    .editTitleButton{
        padding: 7px 6px;
        font-size: 12px;
        text-align: center;
        border-radius: 5px;
    }
    .editTitleCancel{
        background: #bebebe;
        color: $_fontf;
    }
    .editTitleOk{
        background: $_colorMain;
        color: $_fontf;
        margin-left: 8px;
    }
}
.orderRemark{
    .orderRemarkEdit{
        width: 72px;
        float: right;
        font-size: 12px;
        color: $_colorAid;
        margin-top: 20px;
        cursor: pointer;
        text-decoration: underline;
    }
}
/* 弹框的二维码和pc 路书链接 */
.QRcode{
    padding-top: 6%;width: 50%;
    text-align: center;
}
.moblieQr{
    display: block;width: 120px;padding-bottom: 15px;
    height: 120px;margin: 0 auto;
}
.pcQRcode{
    padding: 6% 0;font-size:14px;color:#666;
    width: 50%;border-left: 1px solid #e5e5e5;
    text-align: center;
}
.pcQRcode span{cursor: pointer}
.pcImg{
background-image: url('../images/pcBook.png');background-repeat: no-repeat;
display: block;width: 120px;
    height: 120px;
    background-size: 120px;
    margin: 7px auto;
}
.pcQRcode:hover .pcImg{
    background-image: url('../images/pcBookYellow.png');color:#FD9600;cursor: pointer;
}
// 分享的弹出框样式
.sharePopover{
    padding: 10px 10px 0px 10px;
    font-size: 12px;
    color: $_fond6;
    .sharePopoverQRcode{
        width: 67px;
        height: 67px;
    }
    .sharePopoverLine{
        margin: 5px 20px;
        width: 1px;
        height: 57px;
        background: $_bacgroundM;
    }
    .sharePopoverText{
        padding: 5px 0;
        >div{
            text-indent: 30px;
            line-height: 20px;
        }
    }
    .sharePopoverWeibo{
        background: url("../images/icon_shareWeibo.png") left center no-repeat;
        background-size: 20px 20px;
        margin-bottom: 15px;
    }
    .sharePopoverHttp{
        background: url("../images/icon_shareHttp.png") left center no-repeat;
        background-size: 20px 20px;
    }
    .sharePopoverBottom{
        width: 100%;
        text-align: center;
        margin-top: 12px;
    }
}
.issuseContent{
    border-bottom: 2px solid #EEEEEE;padding-bottom: 25px;
}
.feedback{
    padding: 40px 0 15px;
    textarea{
        background: #F1F1F1;width: 100%;height: 125px;display: block;font-family:MicrosoftYaHei;
        padding: 10px;
    }
    .backTitle{
        padding-bottom: 10px;
    }
    .issueFoot{
        padding-top: 10px;
    }
    .issueSubmit{
        width:100px;cursor: pointer;
        height:40px; 
        background:rgba(253,150,0,1);    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    float: right;

    }
}
.issueItem{
    padding-bottom: 10px;
    span{
        float: left;cursor: pointer;
    };
    span:first-child{
        width:290px;
    }
    span:nth-child(2){
        width:290px;
    }
    span:last-child{
        width:300px;
    }
}
.helpCenterDialogContent{
    padding: 0 15px 0;
}
.tripBookDialog .el-button{width:120px;}
.tripBookDialog{
   
}
.help_text{
    margin-right: 5px;
    font-size: 14px;
    color: #666666;
}
</style>
<style>
.el-dialog__header{
    padding: 20px 30px 10px;
}
.el-icon-warning:before{
    font-size: 16px;
}
.el-dialog__footer {
    padding: 10px 30px 20px;
}
.el-message-box__title{
        font-size: 16px;color: #666;
    }
    .el-message-box__message p{
        font-size: 18px;    color: #333;
    }
    .el-message-box__btns {
    padding: 15px 15px 0;
    }
    .el-message-box{
        width: 440px;
    }

</style>
