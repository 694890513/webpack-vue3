import { createApp } from 'vue'
import App from './App.vue'
import svgIconRegistered from './utils/svgIconRegisterd'
import './assets/styles/index.scss'

const app = createApp(App)
svgIconRegistered(app)

app.mount('#app')