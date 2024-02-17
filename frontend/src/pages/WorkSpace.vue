<script lang="ts">
import { mapStores } from 'pinia';

import WorkPlace from '@/components/WorkPlace.vue'
import { useWorkStore } from '@/stores/workStore';
import { usePlanStore } from '@/stores/planStore';
import ArrowLeftIcon from '@/components/ArrowLeftIcon.vue';
import HelpIcon from '@/components/HelpIcon.vue';
import UserRules from '@/components/UserRules.vue';

export default {
  name: 'WorkSpace',
  components: { WorkPlace, ArrowLeftIcon, HelpIcon, UserRules },

  data() {
    return {
      imageWidth: 0,
      imageHeight: 0,
      imageUrl: import.meta.env.VITE_SERVER_URL,
      isCreate: false,
      isShowRules: false,
      clientX: 0,
      clientY: 0
    };
  },

  computed: {
    workspaceStyle() {
      return {
        width: `${this.imageWidth}px`,
        height: `${this.imageHeight}px`
      };
    },
    createStyle() {
      return {
        left: `${this.clientX}px`,
        top: `${this.clientY}px`
      }
    },
    ...mapStores(useWorkStore, usePlanStore)
  },

  async created() {
    await this.workStore.loadNames()
    this.workStore.getWorkPlaces()
  },

  mounted() {
    const img = new Image();
    img.src = `${this.imageUrl}/${this.planStore.curPlan.img}`
    img.onload = () => {
      this.imageWidth = img.width
      this.imageHeight = img.height
    }
  },

  methods: {
    correctCoordinates(parentElement: HTMLElement, childElement: HTMLElement) {
      const parentRect: DOMRect = parentElement.getBoundingClientRect()
      const childRect: DOMRect = childElement.getBoundingClientRect()
      let deltaX = 0
      let deltaY = 0

      if (childRect.left < parentRect.left) deltaX = parentRect.left - childRect.left
      else if (childRect.right > parentRect.right) deltaX = parentRect.right - childRect.right
      if (childRect.top < parentRect.top) deltaY = parentRect.top - childRect.top
      else if (childRect.bottom > parentRect.bottom) deltaY = parentRect.bottom - childRect.bottom

      return { deltaX, deltaY }
    },
    changeWorkPlace({ workPlaceElement, id, x, y }: { workPlaceElement: HTMLElement; id: number; x: number; y: number; }) {
      const findIndex = this.workStore.workPlacesList.findIndex(place => place.id === id)
      if (findIndex !== -1) {
        const { deltaX, deltaY } = this.correctCoordinates(this.$refs.workspaceRef as HTMLElement, workPlaceElement)
        this.workStore.changeWorkPlace(findIndex, x + deltaX, y + deltaY)
      }
    },
    createWorkPlace(e: MouseEvent) {
      if (e.button !== 0) return
      this.isCreate = true
      this.clientX = e.offsetX
      this.clientY = e.offsetY
      const workSpaceElementWidth = (this.$refs.workspaceRef as HTMLElement).clientWidth
      if (this.clientX + 367 > workSpaceElementWidth) this.clientX = workSpaceElementWidth - 367
      const workSpaceElementHeight = (this.$refs.workspaceRef as HTMLElement).clientHeight
      if (this.clientY + 255 > workSpaceElementHeight) this.clientY = workSpaceElementHeight - 255
    },
    async handleCreate() {
      this.isCreate = false
      await this.workStore.createWorkPlace(this.clientX, this.clientY)
    },
    handleShowRules() {
      this.isShowRules = true;

    },
    handleHideRules() {
      this.isShowRules = false;
    }
  },
}
</script>

<template>
  <div class="schema" :style="{ backgroundImage: `url(${imageUrl}/${planStore.curPlan.img})` }">
    <RouterLink to="/" class="link">
      <ArrowLeftIcon /><span>К списку схем</span>
    </RouterLink>
    <div class="help" @click.stop="handleShowRules">
      <span>Инструкция</span>
      <HelpIcon />
    </div>
    <UserRules v-if="isShowRules" @close-modal="handleHideRules" />
    <div class="workspace" :style="workspaceStyle" ref="workspaceRef" @dblclick.stop="createWorkPlace">
      <div class="create" :style="createStyle" v-show="isCreate" ref="createRef">
        <span>Создать новое рабочее место?</span>
        <button type="button" @click.stop="handleCreate">Да</button>
        <button type="button" @click.stop="isCreate = false">Нет</button>
      </div>
      <WorkPlace v-for="workPlace in workStore.workPlacesList" :key="workPlace.id" :work-place="workPlace"
        @work-place-moved="changeWorkPlace" />
    </div>
  </div>
</template>

<style scoped>
.schema {
  width: inherit;
  background-repeat: no-repeat;
}

.link {
  position: absolute;
  top: 7px;
  left: 10px;
  color: #ffffff;
  padding: 3px 5px;
  background-color: var(--button-bg-color);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  display: flex;
  gap: 15px;
  transition: padding 0.5s, top 0.5s;
}

.link:hover {
  top: 5px;
  padding: 5px 20px;
  z-index: 99;
}

.link span {
  display: none;
}

.link:hover span {
  display: inline-block;
}

.help {
  position: absolute;
  left: 53px;
  top: 7px;
  height: 26px;
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.help:hover {
  height: 30px;
  top: 5px;
}

.help:hover svg {
  width: 30px;
  height: 30px;
}

.help span {
  height: 100%;
  overflow: hidden;
  background-color: var(--button-bg-color);
  margin-right: -3px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 0;
  padding: 3px 0;
  transition: all 0.5s;
}

.help:hover span {
  padding: 5px 5px 5px 10px;
  width: 110px;
}

.workspace {
  position: relative;
}

.create {
  position: absolute;
  display: flex;
  gap: 10px;
  padding: 10px 15px;
  color: #fbe4e4;
  background-color: var(--button-bg-color);
  border: none;
  border-radius: 20px;
  cursor: default;
  z-index: 2;
  width: max-content;
}

.create button {
  border: none;
  color: var(--button-bg-color);
  border-radius: 10px;
  width: 35px;
  cursor: pointer;
}
</style>@/stores/workStore