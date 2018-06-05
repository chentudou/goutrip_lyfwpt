import * as types from '../mutation-types.js';
import api from "@/handler/tranfer";
const state = {
    member: null,
    isLogin: 0,
    registerEmail: '',
    isEmailCode: '',
    logout:""
};
// getters
const getters = {
    member: state => state.member,
    isLogin: state => state.isLogin,
    registerEmail: state => state.registerEmail,
    isEmailCode: state => state.isEmailCode,
    logout: state => state.logout,
};
// actions
const actions = {
    /* 账号密码登录 */
    accountLogin({
        commit
    }, params) {
        return new Promise((resolve, reject) => {
            api.post('/login', params).then(result => {
                let member = result.item;
                resolve(member);
                commit(types.USER_INFO, {
                    member
                });
            }).catch(err => {
                //console.log(err);
                reject(err);
            });
        });
    },
    /* 请求node下session的member */
    node_session({
        commit
    }) {
        api.get('/login/userInfo').then(member => {
            commit(types.USER_INFO, {
                member
            });
        }).catch(err => {
            console.log(err);
        });
    },
    /* 退出登录 */
    logout({
        commit
    }) {
        commit(types.LOGOUT);
    },
    /* registerInfo 记录registerInfo 信息 */
    registerInfo({
        commit
    }, params) {
        commit(types.REGISTER_INFO, params);
    },
    resetPswd({
        commit
    }) {
        commit(types.RESET_PSWD);
    },
    vuexSyncData({
        commit
    },params){
        //console.log('action--vuexSyncData',params)
        commit(types.VUEX_SYNC_DATA,params);
    }
};
// mutations
const mutations = {
    //账户密码登录
    [types.USER_INFO](state, {
        member
    }) {
        state.member = member;
        state.isLogin = state.member && state.member!='' ? 1 : 0;
        sessionStorage.loginStatus = state.isLogin;
    },
    //退出登录
    [types.LOGOUT](state) {
        //console.log("satate",state)
        state.member = null;
        state.isLogin = 0;
        state=null;
        sessionStorage.loginStatus = 0;
    },
    /* 记录registerInfo 信息 */
    [types.REGISTER_INFO](state, params) {
        state.registerEmail = params.email
        state.isEmailCode = params.captcha
    },
    /*保险起见， 重置密码后，sessionStorge里面的登录状态要改变 */
    [types.RESET_PSWD](state) {
        state.member = null;
        state.isLogin = 0;
        sessionStorage.loginStatus = state.isLogin;
    },
    /* 修改信息后，同步vuex里面的数据，下次登录时会获取真正的后台数据 */
    [types.VUEX_SYNC_DATA](state,params){
        console.log('mutations--vuexSyncData',params)
        for(let item in params){
            state.member[item]=params[item];
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};