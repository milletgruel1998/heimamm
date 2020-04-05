/* 导入插件 */
import VueRouter from 'vue-router'
import Vue from 'vue'

/* 导入组件 */
import login from '@/view/login/login.vue'

/* 使用插件 */
Vue.use(VueRouter)

/* 路由实例化 */
const Router = new VueRouter({
    /* 路由配置 */
    routes: [
        {
            path: '/',
            component: login
        }
    ]
});

/* 输出路由 */
export default Router