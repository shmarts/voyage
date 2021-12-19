import { Ref } from 'vue'
import { Position } from '@voyage/types'
import { State } from '@/types'

class Cursor {
  clientId: string
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  dx: number
  dy: number

  constructor({
    clientId,
    ctx,
    position,
  }: {
    clientId: string
    ctx: CanvasRenderingContext2D
    position: Position
  }) {
    this.clientId = clientId
    this.ctx = ctx
    this.x = position[0]
    this.y = position[1]
    this.dx = 1
    this.dy = 1
  }

  move(position: Position) {
    this.x = position[0]
    this.y = position[1]
  }

  draw(color = 'red') {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2)
    this.ctx.fill()
  }

  animate() {
    // this.x += this.dx
    // this.y += this.dy

    this.draw()
  }
}

export default ({
  canvas,
  state,
}: {
  canvas: Ref<HTMLCanvasElement | undefined>
  state: Ref<State>
}): void => {
  const cursors = ref<Cursor[]>([])

  const draw = () => {
    console.log('draw')
  }

  const resizeHandler = () => {
    if (!canvas.value) return
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight

    draw()
  }

  window.addEventListener('resize', resizeHandler)

  watch(
    () => state.value.length,
    () => {
      console.log('hi')
      cursors.value.push(
        new Cursor({
          clientId: state.value[state.value.length - 1].clientId,
          ctx: canvas.value.getContext('2d')!,
          position: [20, 10],
        }),
      )
    },
  )

  onMounted(() => {
    if (!canvas.value) return

    resizeHandler()

    const ctx = canvas.value.getContext('2d')!

    const update = () => {
      ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)

      for (const cursor of cursors.value) {
        const client = state.value.find((s) => s.clientId === cursor.clientId)!
        cursor.move(client.position)
        cursor.draw()
      }

      requestAnimationFrame(update)
    }

    update()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}
