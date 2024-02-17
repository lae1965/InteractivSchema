<script lang="ts">
import { mapStores } from 'pinia'

import { usePlanStore } from '@/stores/planStore'
import LoadPlan from '@/components/LoadPlan.vue';

export default {
  name: 'HomePage',
  computed: {
    ...mapStores(usePlanStore)
  },
  created() {
    this.planStore.getPlanList();
  },
  components: { LoadPlan },
  data() {
    return {
      isModalVisible: false
    }
  },
  methods: {
    async handleCreatePlan(formData: FormData) {
      await this.planStore.createNewPlan(formData)
      await this.planStore.getPlanList()
      this.isModalVisible = false
    },
    async handleSelectPlan(id: number) {
      await this.planStore.getPlanById(id)
      this.$router.push({ name: 'workspace' })
    }
  }
}
</script>

<template>
  <div class="plans">
    <h1 class="heading">Загруженные схемы помещений</h1>
    <div class="plans__wrapper" v-if="planStore.plansList.length">
      <div v-for="plan in planStore.plansList" :key="plan.id">
        <p class="plan" @click="handleSelectPlan(plan.id)" tabindex="0">{{ plan.name }}</p>
      </div>
    </div>
    <p v-else>Схемы отсутствуют</p>
    <button class="button" type="button" @click.stop="isModalVisible = true">Загрузить новую схему</button>
    <LoadPlan v-if="isModalVisible" @close-modal="isModalVisible = false" @create-plan="handleCreatePlan" />
  </div>
</template>

<style scoped>
.plans {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.heading {
  font-size: 30px;
  color: darkviolet;
  position: relative;
  margin-bottom: 20px;
}

.plans__wrapper {
  width: 100%;
}

p {
  color: var(--button-submit-bg-color);
  font-size: 20px;
  width: 100%;
  text-align: center;
  padding: 10px 0;
}

.plan {
  border-radius: 22px;
  transition: transform 0.5s;
}

.plan:hover {
  background-color: #e9d9d9;
  transform: scale(1.03);
}

.button {
  width: 100%;
  margin-top: 20px;
  font-size: 20px;
  background-color: var(--button-bg-color);
  padding: 10px 20px;
  border: none;
  border-radius: 32px;
  color: #ffffff;
  transition: transform 0.5s;
  position: relative;
}

.button:hover {
  background-color: var(--button-bg-hover-color);
  transform: scale(1.03);
}
</style>