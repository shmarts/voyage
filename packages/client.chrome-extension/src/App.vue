<template>
  <canvas ref="canvas" class="fixed inset-0 z-50 pointer-events-none" />

  <div>{{ clientId }}</div>

  {{ state }}

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
import useCanvas from './hooks/useCanvas'
import useMousePosition from './hooks/useMousePosition'
import useUrl from './hooks/useUrl'
import useWs from './hooks/useWs'

const { url } = useUrl()
const { position } = useMousePosition()

const { clientId, state } = useWs({ url, position })

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
})

const computedState = computed(() => state.value.filter((c) => c.clientId !== clientId.value))

useCanvas({ canvas, state: computedState })
</script>
