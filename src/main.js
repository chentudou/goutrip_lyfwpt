// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import moment from 'moment'
import { initGooglemap } from "@/handler/ggMapLoader";

//moment.locale('zh-cn');
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  //验证是否登录
  verifyLogin(to.name,from.name);
  next();
});

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
})
//初始化谷歌地图
initGooglemap({
  key: "AIzaSyAykiHW3aGWjrc4XSxp_W_2G79eR4O4Czg",
  language: 'zh-CN',
  v: '3'
});
/* Vue.use(MarkerClusterer);
 */
Vue.filter('fromatDate', function (value) {
  // 返回处理后的值
  const i = moment(Number(value)).format('YYYY-MM-DD');
  return i;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});

function verifyLogin(toName, fromName) {

  let setPage = ['/', 'manage'];
  let loginStatus = Number(sessionStorage.loginStatus);
  setPage.filter(function (item) {
    if (!loginStatus) { //没有登录
      if (toName != 'login') {
        console.log('登录失效，请重新登录！')
        router.push({
          path: '/'
        });
      }else if(toName=='trip/book'){
        console.log('trip/book');
        return;
      }
    } else if (loginStatus && !fromName) { //刷新-且-已登录----刷新===from.name===null
      if (toName != 'login') {
        //console.log('1111111111')
        store.dispatch('node_session');
        return;
      } else if (toName == 'login') {
        store.dispatch('node_session').then(() => {
          router.push({
            path: '/manage'
          });
        });
        return false;
      }
    }
  });
}