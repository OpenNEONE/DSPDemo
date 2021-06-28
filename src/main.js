import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "element-ui/lib/theme-chalk/index.css";

//elementUI组件
import ElementUI from "element-ui";
Vue.use(ElementUI);


// 按需引入 
// import { Button, Select , Steps,
//   Step,} from 'element-ui';
// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
// Vue.use(Steps);
// Vue.use(Step);
// 或写为
//  * Vue.use(Button)
//  * Vue.use(Select)



// Vue.use(Element, { size: "small", zIndex: 3000 });



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
