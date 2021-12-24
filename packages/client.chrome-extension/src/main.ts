import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

createApp(App).use(createPinia()).mount('#app')

// const MOUNT_EL_ID = 'voyage_el'

// let mountEl = document.getElementById(MOUNT_EL_ID)
// if (mountEl) {
//   mountEl.innerHTML = ''
// }
// mountEl = document.createElement('div')
// mountEl.setAttribute('id', MOUNT_EL_ID)
// document.body.appendChild(mountEl)

// const vm = createApp(App).mount(mountEl)

// chrome.runtime.onMessage.addListener((message) => {
//   if (message.toggleVisible) {
//     ;(vm as any).visible = !(vm as any).visible
//   }
// })
