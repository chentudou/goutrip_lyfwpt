import Vue from 'vue'
import Vuex from 'vuex'

import  theLogin from './modules/theLogin';
import  theManage from './modules/theManage';
import tripEdit from './modules/tripEdit'


Vue.use(Vuex);

export default new Vuex.Store({    
    // actions,
    modules: {
      theLogin,
      theManage,
        tripEdit
    }
});