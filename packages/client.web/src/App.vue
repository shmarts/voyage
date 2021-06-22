<template>
  <div class="font-bold">monorepo</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { helloWorld } from '@monorepo/lib'

export default defineComponent({
  setup() {
    helloWorld('Vite')
  },
})
</script>
