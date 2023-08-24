import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import our custom CSS
import '../scss/styles.scss'

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

createApp(App).use(router).use(BootstrapVue).use(IconsPlugin).mount('#app')

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })
