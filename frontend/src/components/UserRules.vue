<script lang="ts">
import ModalUI from './ModalUI.vue';

export default {
  name: 'UserRules',
  components: { ModalUI }
}
</script>

<template>
  <ModalUI>
    <div class="rules">
      <h1 class="heading">Руководство по использованию схемы</h1>
      <ul class="rules-list">
        <li>Для создания нового рабочего места сделайте двойной клик левой кнопкой мышки в том месте схемы, в котором
          собираетесь создать.</li>
        <li>Для изменения имени работника сделайте клик мышкой по старому имени либо надписи "Выберите имя". Появится
          список
          всех сотрудников, кликните по нужному.</li>
        <li>Для удаления рабочего места кликните по нему ПРАВОЙ кнопкой мышки.</li>
        <li>Для изменения локации рабочего места захватите его, зажав в любом месте левой кнопкой мышки, затем двигайте
          мышку, рабочее место будет двигаться вместе с ней. При отпускании кнопки захват работать перестанет и сохранятся
          новые
          координаты.</li>
      </ul>
    </div>
  </ModalUI>
</template>

<style scoped>
.rules {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.heading {
  text-align: center;
}

.rules-list li {
  margin-bottom: 10px;
}
</style>