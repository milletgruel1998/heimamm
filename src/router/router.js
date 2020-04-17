// 路由跳转出错处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

/* 导入插件 */
import Vue from 'vue'
import VueRouter from 'vue-router'

/* 导入子组件 */
import login from '@/view/login/login.vue'
import layout from '@/view/home/layout.vue'
import chart from '@/view/home/chart/chart.vue'
import userList from '@/view/home/userList/userList.vue'
import question from '@/view/home/question/question.vue'
import business from '@/view/home/business/business.vue'
import subject from '@/view/home/subject/subject.vue'

/* 使用插件 */
Vue.use(VueRouter)

/* 路由实例化 */
const router = new VueRouter({
    /* 路由配置 */
    routes: [
        {
            path: '/',
            component: login,
            meta: {
                title: "登录",
                rules: ['超级管理员', '管理员', '老师', '学生']
            }
        },
        {
            path: '/home',
            component: layout,
            // rules: ['超级管理员', '管理员', '老师', '学生'],
            /* 匹配到home路由后，重定向到home下面的subject */
            redirect: '/home/subject',
            // 配置嵌套路由，在父路由配置中加一个children
            children: [
                {
                    path: 'chart', //这里可以把 `/` 省略掉，它是相对地址---也可以写 `/home/chart`
                    component: chart,
                    meta: {
                        title: '数据概览',
                        rules: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-pie-chart'
                    }
                },
                {
                    path: 'userList',
                    component: userList,
                    meta: {
                        title: '用户列表',
                        rules: ['超级管理员', '管理员'],
                        icon: 'el-icon-user'

                    }
                },
                {
                    path: 'question',
                    component: question,
                    meta: {
                        title: '题库列表',
                        rules: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-edit-outline'
                    }
                },
                {
                    path: 'business',
                    component: business,
                    meta: {
                        title: '企业列表',
                        rules: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-office-building'
                    }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: {
                        title: '学科列表',
                        rules: ['超级管理员', '管理员', '老师', '学生'],
                        icon: 'el-icon-notebook-2'
                    }
                },
            ]
        }
    ],
});
/* 导入进度条插件 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import store from '@/store/index.js'
import { removeToken } from '@/utils/token.js'
// 路由导航守卫
// 进入路由前
router.beforeEach((to, form, next) => {
    // 开启进度条
    NProgress.start()
    // 因为created钩子函数只能执行一次，所以需要在导航卫士里再进行判断
    //这里给vuex中的role一个最高权限是因为:(进入layout)导航守卫的执行时机比钩子函数还要早,如果不给vuex中的role一个默认值的话，当登录的时候导航守卫执行时获取到一个空的角色，就会出问题
    if (to.meta.rules.includes(store.state.role)) {
        // 当用户没有被禁用时，先给vuex中的role一个最高权限，先让它进来，再把真实role传过去
        next();
    } else {
        // 弹出信息提示
        Message.warning('路由导航：您无权访问该页面！')
        // 清除掉token
        removeToken();
        next('/')
    }
    // next()
})
// 进入到路由后   to from 基本就不使用了
router.afterEach((to) => {
    // 结束进度条
    NProgress.done();
    // 修改每个子组件对应的title的值
    document.title = to.meta.title // to 就相当于 this.$route
})

/* 输出路由 */
export default router