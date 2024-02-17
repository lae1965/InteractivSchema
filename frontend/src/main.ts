import { createApp, type Directive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router/index'
import './assets/main.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')

app.directive('click-outside', <Directive>{
  mounted(element, { value }) {
    element.clickOutside = (e: Event) => {
      if (!(element === e.target || element.contains(e.target))) value(e)
    }
    document.body.addEventListener('click', element.clickOutside)
  },

  unmounted(element) {
    document.body.removeEventListener('click', element.clickOutside)
  },
})
