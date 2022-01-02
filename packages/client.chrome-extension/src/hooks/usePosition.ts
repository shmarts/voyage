import { Ref } from 'vue'
import { Position } from '@voyage/types'

export default (): { position: Ref<Position> } => {
  const position = ref<Position>([0, 0])

  const handler = (event: MouseEvent) => {
    position.value = [event.pageX / window.innerWidth, event.pageY]
  }

  window.addEventListener('mousemove', handler)
  window.addEventListener('dragover', handler)

  onUnmounted(() => {
    window.removeEventListener('mousemove', handler)
    window.removeEventListener('dragover', handler)
  })

  return { position }
}
