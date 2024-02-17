import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'

import type { IFullPlan, IPlan } from '../util/types'

export const usePlanStore = defineStore('plan', {
  state: () => ({
    plansList: <IPlan[]>[],
    curPlan: <IFullPlan>{},
    url: import.meta.env.VITE_SERVER_API_URL,
  }),

  getters: {
    getCurPlan(): IFullPlan {
      return this.curPlan
    },
  },

  actions: {
    async getPlanList() {
      try {
        const response = await axios.get(`${this.url}/schema`)
        this.plansList = response.data
      } catch (e) {
        console.log((e as AxiosError).message)
        throw e
      }
    },
    async getPlanById(id: number) {
      try {
        const response = await axios.get(`${this.url}/schema/${id}`)
        this.curPlan = response.data
      } catch (e) {
        console.log((e as AxiosError).message)
        throw e
      }
    },
    async createNewPlan(formData: FormData) {
      try {
        await axios.post(`${this.url}/schema`, formData)
      } catch (e) {
        console.log((e as AxiosError).message)
        throw e
      }
    },
  },
})
