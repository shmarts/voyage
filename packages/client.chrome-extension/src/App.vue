<template>
  <canvas ref="canvas" style="position: fixed; inset: 0px; z-index: 50; pointer-events: none" />
  <div v-if="isDev" style="position: fixed; top: 0; right: 0; z-index: 9999">
    <div
      v-for="client in store.viewState"
      :key="client.clientId"
      :style="{ backgroundColor: client.clientId === store.clientId ? 'red' : 'white' }"
    >
      {{ client }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Cursor from '@/Cursor'
import { useStore } from '@/store'
import useUrl from '@/hooks/useUrl'
import usePosition from '@/hooks/usePosition'
import useCanvas from '@/hooks/useCanvas'
import { getRandomColor } from '@/colors'

const isDev = import.meta.env.MODE === 'development'

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
        color: getRandomColor(),
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

  let then = 0
  const update = (time?: number) => {
    ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)

    const timeInSeconds = time! * 0.001
    const deltaTimeInSeconds = timeInSeconds - then
    then = timeInSeconds
    for (const cursor of cursors.value) {
      const client = store.filteredViewState.find((s) => s.clientId === cursor.clientId)
      if (!client) continue
      cursor.move(client.position, deltaTimeInSeconds * 10)
      cursor.draw()
    }

    requestAnimationFrame(update)
  }

  update()
})
</script>
