<script lang="ts">
import { RouterView } from 'vue-router';

export default {
  components: { RouterView },
}
</script>

<template>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.main {
  width: 100%;
  min-height: 100vh;
  background-color: #c3b9b9;
  display: flex;
  justify-content: center;
  padding: 40px;
}
</style>