import { createApp } from 'vue'
import App from './App.vue'
import { vIntersection } from 'vue-v-intersect'

const app = createApp(App)
app
  .directive('intersect', vIntersection)
  .mount('#app')
