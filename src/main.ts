import { createApp } from 'vue'
import App from './App.vue'
import svgIconRegistered from './utils/svgIconRegisterd'
import './assets/styles/index.scss'
import router from '@/router';
import pinia from '@/stores/index';
import { i18n } from '@/i18n/index';
import 'element-plus/es/components/message/style/css'

const app = createApp(App)
svgIconRegistered(app)

app.use(router).use(pinia).use(i18n)
app.mount('#app')