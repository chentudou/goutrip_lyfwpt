import * as types from '../mutation-types'
import arrRemoveRepeat from '@/handler/arrRemoveRepeat'
// state
const state = {
    travelId: null,
    currentInfo: {},
    /* 当前信息（左侧列表） */
    tripInfo: {},
    /* 旅行信息 */
    addCurrentInfo: {},
    /* 当前信息（左侧列表）添加 */
    delCurrentInfo: {},
    /* 当前信息（左侧列表）删除 */
    errInfo: '',
    jumpNum: 1,
    /* 跳转到编辑页面时的页码 */
    currentCityId: "",
    /* 当前城市id */
    mapWidth: 0,
    /* 左侧列表是否展开 */
    addPoiToCenterList: [], // 右侧点击加号添加进入中间列表的poi数据
    poiListPosition: [], // 用来存放地图用的基本poi信息
    poiListHoverIndex: {}, // 鼠标移动到某一个poi的时候的下标
    addView: {}, // 点击地图上的添加，返回的poi  Id
    showDetail: {}, // 点击地图上的添加，返回的poi  Id,
    clearClassicRoute:0,
    addClassicToCenterList:[],
    popoverEvery:{},
}

// getters
const getters = {
    travelId: state => state.travelId,
    currentInfo: state => state.currentInfo,
    tripInfo: state => state.tripInfo,
    addCurrentInfo: state => state.addCurrentInfo,
    delCurrentInfo: state => state.delCurrentInfo,
    errInfo: state => state.errInfo,
    jumpNum: state => state.jumpNum,
    currentCityId: state => state.currentCityId,
    mapWidth: state => state.mapWidth,
    addPoiToCenterList: state => state.addPoiToCenterList,
    poiListPosition: state => state.poiListPosition,
    poiListHoverIndex: state => state.poiListHoverIndex,
    addView: state => state.addView,
    showDetail: state => state.showDetail,
    clearClassicRoute: state => state.clearClassicRoute,
    addClassicToCenterList:state=>state.addClassicToCenterList,
    popoverEvery:state=>state.popoverEvery,
}

// action
const actions = {
    // 鼠标移动到某一个poi的时候的下标
    poiListHoverIndex({
        commit
    }, params) {
        commit(types.POI_LIST_HOVER_INDEX, params)
    },
    // 右侧poi数据列表的经纬度
    poiListPosition({
        commit
    }, params) {
        commit(types.POI_LIST_POSITION, params)
    },
    // 添加一个poi数据到中间的列表
    addPoiToCenterList({
        commit
    }, params) {
        //state.addPoiToCenterList.length=0;
        commit(types.ADD_POI_TO_CENTER_LIST, params)
    },
    /* 点击列表的某一个，弹出对应详情 */
    addClassicToCenterList({
        commit
    }, params) {
        commit(types.ADD_CLASSIC_TO_CENTER_LIST, params)
    },
    /* 提交当前travelId */
    travelId({
        commit
    }, params) {
        commit(types.TRAVEL_ID, params);
    },
    errInfo({
        commit
    }) {
        commit(types.ERR_INFO);
    },
    jumpNum({
        commit
    }, val) {
        commit(types.JUMP_NUM, val);
    },
    popoverEvery({
        commit
    }, val) {
        commit(types.POPOVER_EVERY, val);
    },
    addView({
        commit
    }, params) {
        commit(types.ADD_VIEW, params);
    },
    showDetail({
        commit
    }, params) {
        commit(types.SHOW_DETAIL, params);
    },
    mapWidth({
        commit
    }, val) {
        commit(types.MAP_WIDTH, val);
    },
    currentCityId({
        commit
    }, val) {
        commit(types.CURRENT_CITY_ID, val);
    },
    /* 添加完成后，清除经典行程 数组 */
    clearClassicRoute({
        commit
    }, val) {
        commit(types.CLEAR_CLASSIC_ROUTE, val);
    },
    /* 左侧切换后，头部城市列表 */
    currentInfo({
        commit
    }, params) {
        commit(types.CURRENT_INFO, params);
    },
    tripInfo({
        commit
    }, params) {
        commit(types.TRIP_INFO, params);
    },
    /* 添加头部城市选择 */
    addCurrentInfo({
        commit
    }, params) {
        commit(types.ADD_CURRENT_INFO, params);
    },
    /* 删除头部城市选择 */
    delCurrentInfo({
        commit
    }, val) {
        commit(types.DEL_CURRENT_INFO, val);
    },
    /* 删除头部城市选择 */
}

// mutation
const mutations = {
    [types.POI_LIST_HOVER_INDEX](state, data) {
        state.poiListHoverIndex = data
    },
    [types.POI_LIST_POSITION](state, data) {
        state.poiListPosition = data
    },
    [types.ADD_POI_TO_CENTER_LIST](state, data) {
        state.addPoiToCenterList.push(data);
    },
    [types.ADD_CLASSIC_TO_CENTER_LIST](state, data) {
        //console.log("0000",data);
        state.addClassicToCenterList.push(data);
        //console.log('1111',state.addClassicToCenterList)
    },
    [types.ERR_INFO](state, data) {
        state.errInfo = "";
    },
    [types.TRAVEL_ID](state, data) {
        state.travelId = data.travelId;
    },
    [types.MAP_WIDTH](state, val) {
        state.mapWidth = val;
    },
    [types.JUMP_NUM](state, val) {
        state.jumpNum = val;
    },
    [types.POPOVER_EVERY](state, val) {
           let i=0
        state.popoverEvery ={
            val:val,i:i++
        } ;
        //console.log(state.popoverEvery)
    },
    [types.CLEAR_CLASSIC_ROUTE](state, val) {
        if(val) state.addClassicToCenterList.length=0;
    },
    [types.ADD_VIEW](state, obj) {
        //console.log('state.addView', obj);
        /* let arr=[];
        arr.push(obj)
        console.log('arr',arr) */
        state.addView = obj;
    },
    [types.SHOW_DETAIL](state, obj) {
        //console.log('state.detail', obj)
        state.showDetail = {
            id: obj.id,
            index:obj.index,
            type: obj.type
        };
    },
    [types.CURRENT_CITY_ID](state, val) {
        state.currentCityId = val;
    },
    
    [types.CURRENT_INFO](state, data) {
        //onsole.log('CURRENT_INFO', data);
        state.currentInfo = {
            tripCityName: data.tripCityName ? (Array.isArray(data.tripCityName) ?
                        data.tripCityName : data.tripCityName.split('>')) : [],
            tripCityId: data.tripCityName ? (Array.isArray(data.tripCityId) ?
                        data.tripCityId : data.tripCityId.split(',')) : [],
            dayId: data.dayId ? data.dayId : '',
            dayTime: data.dayTime ? data.dayTime : '',
            currentIndex: data.currentIndex ? data.currentIndex : ''
        }
        //console.log('CURRENT_INFO', state.currentInfo);
    },
    [types.TRIP_INFO](state, data) {
        state.tripInfo = {
            adultNum: data.adultNum ? data.adultNum : "",
            childrenNum: data.childrenNum ? data.childrenNum : "",
            travelName: data.travelName ? data.travelName : '',
            remarks: data.remarks ? data.remarks : '',
        }
    },
    [types.ADD_CURRENT_INFO](state, data) {
        //console.log('state.currentInfo', data);
        if (state.currentInfo.tripCityId.length) {
            for (let i = 0; i < state.currentInfo.tripCityId.length; i++) {
                //console.log(data.id,state.currentInfo.tripCityId[i],state.currentInfo)
                if (state.currentInfo.tripCityId.includes(String(data.id)) || state.currentInfo.tripCityId.includes(data.id)) {
                    state.errInfo = '同一天行程，请勿添加相同城市';
                    break;
                } else {
                    if (state.currentInfo.tripCityName.length < 5) {
                        //console.log('111111111111')
                        state.currentInfo.tripCityName.push(data.value);
                        state.currentInfo.tripCityId.push(data.id);
                        break;
                    } else {
                        state.errInfo = '最多添加5个';
                        break;
                    }
                }
            }
        } else {
            state.currentInfo.tripCityName.push(data.value);
            state.currentInfo.tripCityId.push(data.id);
        }
    },
    [types.DEL_CURRENT_INFO](state, val) {
        //console.log("val",val);
        state.currentInfo.tripCityName.splice(val, 1);
        state.currentInfo.tripCityId.splice(val, 1);
        state.errInfo = "";
        //console.log("state.currentInfo",state.currentInfo)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}