<template>
  <canvas ref="canvas" class="fixed inset-0 z-50 pointer-events-none" />

  <div class="fixed top-0 bg-white">
    <div
      v-for="client in store.viewState"
      :key="client.clientId"
      :class="{ 'bg-red-500': client.clientId === store.clientId }"
    >
      <p>{{ client }}</p>
      <p>{{ cursors.find((c) => c.clientId === client.clientId) }}</p>
    </div>
  </div>

  <div class="p-10">
    <p v-for="i in 20" :key="i" class="mb-8">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate corporis alias neque
      eveniet quia eos officia veritatis voluptatibus quaerat ducimus laborum perferendis dicta
      maxime, deleniti sunt! Amet praesentium quia quibusdam labore quas unde sed ipsa, nihil est
      eaque iure odio totam laudantium voluptatum iusto repellendus earum! In officia odio
      consectetur illo, minima labore.
    </p>
  </div>
</template>

<script setup lang="ts">
import Cursor from '@/Cursor'
import { useStore } from '@/store'
import useUrl from '@/hooks/useUrl'
import usePosition from '@/hooks/usePosition'
import useCanvas from '@/hooks/useCanvas'

const store = useStore()

// connect to view + update connection as url changes
const { url } = useUrl()
onMounted(() => store.connect(url.value))
watch(url, () => {
  if (store.url) store.messageLeave()
  store.connect(url.value)
})

// track position & move at an interval
const { position } = usePosition()
setInterval(() => store.messageMove(position.value), 100)

// insert/delete cursors based on viewState
const cursors = ref<Cursor[]>([])
watch(
  () => store.filteredViewState.length,
  (newVal, oldVal) => {
    if (oldVal > newVal) {
      const missing = cursors.value.findIndex((c) => !store.connectedClientIds.includes(c.clientId))
      cursors.value.splice(missing, 1)
    } else {
      const cursor = new Cursor({
        clientId: store.filteredViewState[store.filteredViewState.length - 1].clientId,
        ctx: canvas.value!.getContext('2d')!,
        position: [0, 0],
      })
      cursors.value.push(cursor)
    }
  },
)

// canvas
const { canvas } = useCanvas()
onMounted(() => {
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')!

  const update = () => {
    ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)

    for (const cursor of cursors.value) {
      const client = store.filteredViewState.find((s) => s.clientId === cursor.clientId)
      if (!client) continue
      cursor.move(client.position)
      cursor.draw()
    }

    requestAnimationFrame(update)
  }

  update()
})
</script>
