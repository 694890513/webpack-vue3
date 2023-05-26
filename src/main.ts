import { createApp } from 'vue'
import App from './App.vue'
import svgIconRegistered from './utils/svgIconRegisterd'
import './assets/styles/index.scss'
import router from '@/router';
import pinia from '@/stores/index';

const app = createApp(App)
svgIconRegistered(app)

app.use(router).use(pinia)
app.mount('#app')