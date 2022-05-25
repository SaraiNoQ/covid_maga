import { createApp } from 'vue'
import App from './App.vue'
import axios from './plugins/axios'
import router from './router'
import store from './store'
import './index.css'
import './plugins/icons'
import 'tw-elements'

import svgIcon from './components/svgIcon.vue'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.$axios = axios
app.component("font-awesome-icon", FontAwesomeIcon)
app.component('svg-icon', svgIcon)
app.mount('#app')
