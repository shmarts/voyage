import { Ref } from 'vue'

export default (): { url: Ref<string> } => {
  const getCurrentUrl = () => {
    return window.location.hostname.replace('www.', '') + window.location.pathname
  }

  const url = ref(getCurrentUrl())

  const handler = () => {
    url.value = getCurrentUrl()
  }

  window.addEventListener('popstate', handler)
  onUnmounted(() => {
    window.removeEventListener('popstate', handler)
  })

  return { url }
}
