<script lang="ts">
import ModalUI from './ModalUI.vue'

export default {
  name: 'LoadPlan',
  components: { ModalUI },
  data() {
    return {
      planName: '',
      fileName: ''
    };
  },
  methods: {
    getFileName(e: Event) {
      this.fileName = (e.target as HTMLInputElement)?.files?.[0].name || '';
    },
    handleClose() {
      this.$emit('close-modal');
    },
    handleCreate(e: Event) {
      this.$emit('create-plan', new FormData(e.target as HTMLFormElement));
    },
  },
  mounted() {
    (this.$refs.nameRef as HTMLInputElement).focus();
  },
}
</script>

<template>
  <ModalUI>
    <form id="load" @submit.prevent="handleCreate" @keydown.enter="handleCreate">
      <h2 class="heading">Выбор новой схемы</h2>
      <input type="text" name="name" placeholder="Название схемы" class="wrap input" required v-model="planName"
        ref="nameRef">

      <label class="input-file">
        <input type="file" name="file" required @change="getFileName">
        <span class="input-file-btn button wrap">Выберите файл</span>
        <span class="input-file-text">{{ fileName || 'Файл не выбран' }}</span>
      </label>

      <button type="submit" class="wrap button">Загрузить схему</button>
    </form>
  </ModalUI>
</template>

<style scope>
#load {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
}

.exit {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.heading {
  font-size: 30px;
  font-weight: 600;
  color: var(--button-submit-bg-color);
}

.input-file {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input {
  outline: none;
  width: 100%;
  border: 2px solid var(--button-submit-bg-color);
}

.wrap {
  font-size: 14px;
  border-radius: 20px;
  height: 40px;
  padding: 10px 20px;
}

.button {
  display: inline-block;
  color: #fff;
  background-color: var(--button-bg-color);
  border: none;
  cursor: pointer;
  text-align: center;
  width: 50%;
  transition: transform 0.5s;
}

.button[type="submit"] {
  background-color: var(--button-submit-bg-color);
  width: 100%;
}

.input-file-btn {
  position: relative;
}

.input-file-text {
  padding: 0 10px;
  line-height: 40px;
  display: inline-block;
  color: var(--button-submit-bg-color);
}

.input-file input[type=file] {
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
}

.button[type="submit"]:hover {
  background-color: var(--button-submit-bg-hover-color);
  transform: scale(1.03);
}

.input-file:hover .input-file-btn {
  background-color: var(--button-bg-hover-color);
  transform: scale(1.03);
}
</style>

