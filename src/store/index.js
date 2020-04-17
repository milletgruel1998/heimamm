/* 导入插件 */
import Vuex from 'vuex'
import Vue from 'vue'

/* 使用插件 */
Vue.use(Vuex)

/* 创建vuex对象 */
const store = new Vuex.Store({
    // 共享数据管理
    state: {
        userInfo: '', // 用户信息
        // 循环生成新增用户时的角色下拉框内容
        roleObj: {
            1: "超级管理员",
            2: "管理员",
            3: "老师",
            4: "学生"
        },
        //这里给vuex中的role一个最高权限是因为:(进入layout)导航守卫的执行时机比钩子函数还要早,如果不给vuex中的role一个默认值的话，当登录的时候导航守卫执行时获取到一个空的角色，就会出问题
        role: "超级管理员"
    }
})
export default store