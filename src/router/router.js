/* 导入插件 */
import Vue from 'vue'
import VueRouter from 'vue-router'

/* 导入子组件 */
import login from '@/view/login/login.vue'

/* 使用插件 */
Vue.use(VueRouter)

/* 路由实例化 */
const router = new VueRouter({
    /* 路由配置 */
    routes: [
        {
            path: '/',
            component: login
        }
    ]
});

/* 输出路由 */
export default router