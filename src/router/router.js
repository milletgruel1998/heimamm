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
            component: login
        },
        {
            path: '/home',
            component: layout,
            /* 匹配到home路由后，重定向到home下面的subject */
            // redirect: '/home/subject',
            // 配置嵌套路由，在父路由配置中加一个children
            children: [
                {
                    path: 'chart',
                    component: chart
                },
                {
                    path: 'userList',
                    component: userList
                },
                {
                    path: 'question',
                    component: question
                },
                {
                    path: 'business',
                    component: business
                },
                {
                    path: 'subject',
                    component: subject
                },
            ]
        }
    ],
});
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 路由导航守卫
router.beforeEach((to, form, next) => {
    NProgress.start()
    next()
})
router.afterEach((to, from) => {
    NProgress.done()
    console.log(to);
    console.log(from);
})

/* 输出路由 */
export default router