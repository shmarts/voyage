import { Ref } from 'vue'

export default (): { canvas: Ref<HTMLCanvasElement> } => {
  const canvas = ref<HTMLCanvasElement>()

  const setCanvasSize = () => {
    if (!canvas.value) return
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }

  onMounted(() => setCanvasSize())

  window.addEventListener('resize', setCanvasSize)
  onUnmounted(() => {
    window.removeEventListener('resize', setCanvasSize)
  })

  return { canvas: canvas as Ref<HTMLCanvasElement> }
}
