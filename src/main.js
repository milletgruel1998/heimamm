/* 导入子组件 */
import App from './App.vue'
/* 导入插件 */
import Vue from 'vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
/* 使用插件 */
Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
