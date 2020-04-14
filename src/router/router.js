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
                title: "登录"
            }
        },
        {
            path: '/home',
            component: layout,
            /* 匹配到home路由后，重定向到home下面的subject */
            // redirect: '/home/subject',
            // 配置嵌套路由，在父路由配置中加一个children
            children: [
                {
                    path: 'chart', //这里可以把 `/` 省略掉，它是相对地址---也可以写 `/home/chart`
                    component: chart,
                    meta: {
                        title: '数据概览'
                    }
                },
                {
                    path: 'userList',
                    component: userList,
                    meta: {
                        title: '用户列表'
                    }
                },
                {
                    path: 'question',
                    component: question,
                    meta: {
                        title: '题库列表'
                    }
                },
                {
                    path: 'business',
                    component: business,
                    meta: {
                        title: '企业列表'
                    }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: {
                        title: '学科列表'
                    }
                },
            ]
        }
    ],
});
/* 导入进度条插件 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 路由导航守卫
// 进入路由前
router.beforeEach((to, form, next) => {
    // 开启进度条
    NProgress.start()
    next()
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