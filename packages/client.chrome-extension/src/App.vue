<template>
  <div class="font-bold">voyage</div>
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
