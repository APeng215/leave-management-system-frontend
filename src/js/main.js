import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
// Import our custom CSS
import '../scss/styles.scss'

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

createApp(App).use(router).mount('#app')

// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })
