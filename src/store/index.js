/* 导入插件 */
import Vuex from 'vuex'
import Vue from 'vue'

/* 使用插件 */
Vue.use(Vuex)

/* 创建vuex对象 */
const store = new Vuex.Store({
    // 共享数据管理
    state: {
        userInfo: '' // 用户信息
    }
})
export default store