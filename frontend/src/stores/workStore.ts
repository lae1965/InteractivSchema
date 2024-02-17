import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'

import { type IName, type IWorkPlace } from '@/util/types'
import { usePlanStore } from './planStore'

export const useWorkStore = defineStore('work', {
  state: () => ({
    workPlacesList: <IWorkPlace[]>[],
    namesList: <IName[]>[],
    url: import.meta.env.VITE_SERVER_API_URL,
  }),

  getters: {
    getCurPlanId() {
      return usePlanStore().curPlan.id
    },
  },

  actions: {
    getWorkPlaces() {
      const planStore = usePlanStore()
      const curPlan = planStore.getCurPlan
      this.workPlacesList = curPlan.workPlace.map((place) => ({
        id: place.id,
        x: place.x,
        y: place.y,
        name: {
          id: place.employeeId,
          name: this.namesList.find((name) => name.id === place.employeeId)
            ?.name,
        },
      }))
    },
    async loadNames() {
      try {
        const response = await axios.get(`${this.url}/employees`)
        this.namesList = response.data
      } catch (e) {
        console.log((e as AxiosError).message)
        throw e
      }
    },
    async changeName(placeId: number, name: IName) {
      try {
        const find = this.workPlacesList.find((place) => place.id === placeId)
        if (!find) return
        await axios.patch(`${this.url}/workplaces/${placeId}`, {
          employeeId: name.id,
        })
        find.name = { ...name }
      } catch (e) {
        if (
          (e as AxiosError).response?.status === 400 &&
          ((e as AxiosError).response?.data as any)?.error ===
            'This employee already has his own workplace.'
        )
          alert(`У сотрудника ${name.name} уже существует рабочее место`)
        return
      }
    },
    async createWorkPlace(x: number, y: number) {
      try {
        const response = await axios.post(`${this.url}/workplaces`, {
          schemaId: this.getCurPlanId,
          x,
          y,
        })
        console.log(response.data)

        this.workPlacesList.push({
          id: response.data.id,
          x,
          y,
          name: {
            id: 0,
            name: '',
          },
        })
      } catch (e) {
        console.log((e as AxiosError).message)
        throw e
      }
    },
    async deleteWorkPlace(id: number) {
      try {
        await axios.delete(`${this.url}/workplaces/${id}`)
        this.workPlacesList = this.workPlacesList.filter(
          (place) => place.id !== id
        )
      } catch (e) {
        console.log((e as AxiosError).message)
        throw e
      }
    },
    changeWorkPlace(index: number, x: number, y: number) {
      this.workPlacesList[index].x = x
      this.workPlacesList[index].y = y
    },
    async saveWorkPlacePosition(workPlace: IWorkPlace) {
      try {
        await axios.patch(`${this.url}/workplaces/${workPlace.id}`, {
          x: workPlace.x,
          y: workPlace.y,
        })
      } catch (e) {
        console.log((e as AxiosError).message)
        throw e
      }
    },
  },
})
