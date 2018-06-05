import Vue from 'vue'
import Router from 'vue-router'

/* 登录-注册-找回密码 */
const Login = resolve => require(['@/pages/login/login'], resolve);
const Register = resolve => require(['@/pages/login/register/register'], resolve);
const FindPswd = resolve => require(['@/pages/login/findPswd/findPswd'], resolve);
const FillEmail = resolve => require(['@/pages/login/findPswd/widget/fillEmail'], resolve);
const EmailValidate = resolve => require(['@/pages/login/findPswd/widget/emailValidate'], resolve);
const ResetPswd = resolve => require(['@/pages/login/findPswd/widget/resetPswd'], resolve);
const Finish = resolve => require(['@/pages/login/findPswd/widget/finish'], resolve);

/* 管理行程 */
const Manage = resolve => require(['@/pages/manage/manage'], resolve);
const CreatTrip = resolve => require(['@/pages/manage/widget/creatTrip'], resolve);
const MyTrip = resolve => require(['@/pages/manage/widget/myTrip'], resolve);
const ManageSet = resolve => require(['@/pages/manage/widget/manageSet'], resolve);
/* 管理設置 */
const Password = resolve => require(['@/pages/manage/widget/subset/password'], resolve);
const Update = resolve => require(['@/pages/manage/widget/subset/update'], resolve);
const Subaccount = resolve => require(['@/pages/manage/widget/subset/subaccount'], resolve);

// 行程编辑
const tripEdit = resolve => require(['@/pages/trip/edit/index.vue'], resolve);
/* 404页面 */
const error = resolve => require(['@/pages/error.vue'], resolve);

Vue.use(Router);

export default new Router({
    routes: [
        /* 登录-注册-找回密码 */
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/findPswd',
            name: 'findPswd',
            component: FindPswd,
            redirect:'/findPswd/fillEmail',
            children:[
                {
                    path: 'fillEmail',
                    name: 'fillEmail',
                    component: FillEmail,
                },
                {
                    path: 'emailValidate',
                    name: 'emailValidate',
                    component: EmailValidate,
                },
                {
                    path: 'resetPswd',
                    name: 'resetPswd',
                    component: ResetPswd,
                },
                {
                    path: 'finish',
                    name: 'finish',
                    component: Finish,
                }
            ]
        },
        /* 制作行程 */
        {
            path:'/manage',
            name:'manage',
            component:Manage,
            redirect:'/manage/myTrip',
            children:[
                {
                    path: 'creatTrip',
                    name: 'creatTrip',
                    component: CreatTrip,
                },
                {
                    path: 'myTrip',
                    name: 'myTrip',
                    component: MyTrip,
                    meta: { KeepAlive: true },
                },
                {
                    path: 'manageSet',
                    name: 'manageSet',
                    component: ManageSet,
                    redirect:'/manage/manageSet/update',
                    children:[
                        {
                            path: 'update',
                            name: 'update',
                            component: Update,
                            meta:{
                                KeepAlive:false
                            }
                        },
                        {
                            path: 'subaccount',
                            name: 'subaccount',
                            component: Subaccount,
                            meta:{
                                KeepAlive:true
                            }
                        },
                        {
                            path: 'password',
                            name: 'password',
                            component: Password,
                            meta:{
                                KeepAlive:false
                            }
                        }
                    ]
                },
                
            ]
        },
        // 编辑行程页面
        {
            path: '/trip/edit/:id',
            name: 'tripEdit',
            component: tripEdit,
        },
        {
            path: '/error',
            name: 'error',
            component: error,
        },

    ],
})
