<template>
  <div class="fixed inset-0 z-50 p-1 font-bold border-4 border-red-500 pointer-events-none">
    voyage
  </div>
  <div class="p-10">
    <!-- Sample webpage in background -->
    <p v-for="i in 100" :key="i" class="mb-8">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate corporis alias neque
      eveniet quia eos officia veritatis voluptatibus quaerat ducimus laborum perferendis dicta
      maxime, deleniti sunt! Amet praesentium quia quibusdam labore quas unde sed ipsa, nihil est
      eaque iure odio totam laudantium voluptatum iusto repellendus earum! In officia odio
      consectetur illo, minima labore.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { helloWorld } from '@voyage/lib'

export default defineComponent({
  setup() {
    helloWorld('Vite')
  },
})
</script>
