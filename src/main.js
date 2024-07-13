import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import {createApp} from 'vue'
import store from 'core-js/internals/shared-store'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
