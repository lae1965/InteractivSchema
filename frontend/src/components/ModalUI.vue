<script lang="ts">
import ExitIcon from './ExitIcon.vue';
export default {
  name: 'ModalUI',
  components: { ExitIcon },
  methods: {
    handleClose() {
      this.$emit('close-modal')
    }
  },
  mounted() {
    (this.$refs.exitRef as HTMLButtonElement).focus();
  }
}
</script>

<template>
  <div class="modal" v-click-outside="handleClose" @keydown.esc="handleClose">
    <button type="button" class="exit" @click="handleClose" ref="exitRef">
      <ExitIcon />
    </button>
    <slot></slot>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  padding: 50px 30px 30px;
  width: 490px;
  background-color: #fff;
  border: 5px solid var(--button-submit-bg-color);
  border-radius: 15px;
  z-index: 10;
}

.exit {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>