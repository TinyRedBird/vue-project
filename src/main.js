import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import { useIntersectionObserver } from '@vueuse/core'
const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()
pinia.use(persist)
app.use(pinia)
app.use(router)

app.mount('#app')
//定义全局指令
app.directive('img-lazy', {
  mounted(el, binding) {
    //el:指令所在的元素
    //binding: binding.value指令的参数
    // console.log(el, binding.value)
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      // console.log(isIntersecting)
      if (isIntersecting) {
        el.src = binding.value
      }
    })
  }
})
