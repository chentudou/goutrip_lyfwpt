import * as types from '../mutation-types.js';
const state = {
    newTripStatus: 0,//创建行程后，记录新行程的状态，我的行程页面刷新之后，再重新归0
    newSubaccountStatus: 0,//创建新子账户后，记录新子账户的状态，子账户页面刷新之后，再重新归0
    copyTripStatus: 0,//复制行程后，记录新行程的状态，行程页面刷新之后，再重新归0
    delTripStatus: 0,//删除行程后，记录行程的状态，子账户页面刷新之后，再重新归0
};
// getters
const getters = {
    newTripStatus: state => state.newTripStatus,/* 新建行程状态 */
    newSubaccountStatus: state => state.newSubaccountStatus,/* 新建子账户状态 */
    copyTripStatus: state => state.copyTripStatus,/* 复制行程状态 */
    delTripStatus: state => state.delTripStatus,/* 删除行程状态 */
    
};
// actions
const actions = {
    newTripStatus({
        commit
    }, val) {
        commit(types.NEW_TRIP_STATUS,{
            val
        })
    },
    newSubaccountStatus({
        commit
    }, val) {
        commit(types.NEW_SUBACCOUNT_STATUS,{
            val
        })
    },
    copyTripStatus({
        commit
    }, val) {
        commit(types.COPY_TRIP_STATUS,{
            val
        })
    },
    delTripStatus({
        commit
    }, val) {
        commit(types.DEL_TRIP_STATUS,{
            val
        })
    }
};
// mutations
const mutations = {
    [types.NEW_TRIP_STATUS](state,val){
        state.newTripStatus=val
    },
    [types.NEW_SUBACCOUNT_STATUS](state,val){
        state.newSubaccountStatus=val
    },
    [types.COPY_TRIP_STATUS](state,val){
        state.copyTripStatus=val
    },
    [types.DEL_TRIP_STATUS](state,val){
        state.delTripStatus=val
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};