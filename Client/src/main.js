import './assets/main.css'

// Material Design Icons
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

// Axios API
import axios from 'axios'
import VueAxios from 'vue-axios'

import { createApp } from 'vue'
import App from './App.vue'
import LogItem from './components/LogItem.vue'

createApp(App)
.use(mdiVue, {
  icons: mdijs
})
.use(VueAxios, axios)
.component('LogItem', LogItem)
.mount('#app')
