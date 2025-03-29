import '@/assets/styles/main.scss'
import '@/assets/styles/tailwind.css'
import { createApp } from 'vue'
import { registerPlugins } from './plugins'
import App from './App.vue'

const app = createApp(App)
registerPlugins(app)
app.mount('#app')