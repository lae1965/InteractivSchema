<script lang="ts">
import type { PropType } from 'vue';
import { mapStores } from 'pinia';

import WorkPlaceIcon from './WorkPlaceIcon.vue'
import { type IWorkPlace } from '@/util/types'
import { useWorkStore } from '@/stores/workStore';

export default {
  name: 'WorkPlace',
  components: { WorkPlaceIcon },
  props: {
    workPlace: {
      type: Object as PropType<IWorkPlace>,
      required: true
    }
  },
  data() {
    return {
      isDragging: false,
      cursorType: 'pointer',
      zIndex: 'unset',
      isChange: false,
      isDelete: false,
      isChangePosition: false,
      curUser: this.workPlace.name,
    }
  },
  computed: {
    workPlaceStyle() {
      return {
        left: `${this.workPlace.x}px`,
        top: `${this.workPlace.y}px`,
        cursor: this.cursorType,
        zIndex: this.zIndex
      }
    },
    ...mapStores(useWorkStore)
  },
  methods: {
    onMouseDown(e: MouseEvent) {
      if (e.button === 2) return
      this.isDragging = true
      this.cursorType = 'move'
      this.zIndex = '100'
    },
    onMouseMove(e: MouseEvent) {
      if (this.isDragging) {
        this.isChangePosition = true;
        this.$emit('work-place-moved', {
          workPlaceElement: this.$el,
          id: this.workPlace.id,
          x: this.workPlace.x + e.movementX,
          y: this.workPlace.y + e.movementY
        })
      }
    },
    async onMouseUp() {
      if (!this.isDragging) return
      this.isDragging = false
      this.cursorType = 'pointer'
      this.zIndex = 'unset'
      if (this.isChangePosition) {
        await this.workStore.saveWorkPlacePosition(this.workPlace)
        this.isChangePosition = false
      }
    },
    async handleSaveName() {
      this.isChange = false
      await this.workStore.changeName(this.workPlace.id, this.curUser)
    },
    deletePlace(e: MouseEvent) {
      if (e.button === 0) return;
      this.isDelete = true;
    },
    async handleDelete() {
      this.isDelete = false
      await this.workStore.deleteWorkPlace(this.workPlace.id)
    },
    handleChangeName() {
      this.isChange = true
    },
    handleClickOutside() {
      this.isChange = false
    },
    handleEscape() {
      this.isChange = false
    }
  }
}
</script>

<template>
  <div class="work-place" :style="workPlaceStyle" @mousedown.stop="onMouseDown" @mousemove.stop="onMouseMove"
    @mouseup.stop="onMouseUp" @mouseleave.stop.prevent="onMouseUp" @contextmenu.prevent="deletePlace" @click.stop>
    <WorkPlaceIcon />
    <div class="delete" v-if="isDelete">
      <span>Удалить?</span>
      <button type="button" @click.stop="handleDelete" @mousedown.stop>Да</button>
      <button type="button" @click.stop="isDelete = false" @mousedown.stop>Нет</button>
    </div>
    <div class="name" @click.stop="handleChangeName" @mousedown.stop @dblclick.stop>
      <span :disabled="!workPlace.name.name">{{ workPlace.name.name || 'Выберите сотрудника' }}</span>
      <select class="change-name" v-if="isChange" v-model="curUser" @change="handleSaveName"
        v-click-outside="handleClickOutside" @keydown.esc="handleEscape">
        <option v-for="user in workStore.namesList" :key="user.id" :value="user" @mousedown.stop>{{ user.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.work-place {
  width: 212px;
  position: absolute;
}

.name {
  font-size: 12px;
  line-height: 100%;
  color: var(--button-submit-bg-color);
  position: absolute;
  bottom: 30px;
  left: 18px;
  width: 54%;
  text-align: center;
  border-radius: 5px;
  min-height: 25px;
}

.name span[disabled="true"] {
  color: var(--button-delete-bg-color);
}

.change-name {
  display: flex;
  width: 100%;
  font-size: 12px;
  position: absolute;
  left: 0;
  top: 0;
}

.input-name {
  font-size: 12px;
  color: var(--button-submit-bg-color);
  width: -webkit-fill-available;
  outline: none;
}

.input-save {
  cursor: grab;
}

.input-save:hover {
  transform: scale(1.2);
}

.delete {
  font-size: 14px;
  display: flex;
  gap: 10px;
  padding: 10px 15px;
  color: #f7dbdb;
  background-color: var(--button-delete-bg-color);
  border: none;
  border-radius: 16px;
  position: absolute;
  left: 13px;
  top: 80px;
  cursor: default;
}

.delete button {
  border: none;
  color: var(--button-delete-bg-color);
  border-radius: 10px;
  width: 35px;
  cursor: pointer;
}
</style>