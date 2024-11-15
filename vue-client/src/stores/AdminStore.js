import { defineStore } from 'pinia'
import Logger from 'js-logger'

// Services
import api from '@/services/adminApi'

export const useAdminStore = defineStore('admin', {
  state: () => {
    applications: []
    return {
      IsAdminMode: false
    }
  },
  actions: {
    async fetchApplications() {
      Logger.info('admin:fetchApplications')
      await api.get('/api/applications').then((response) => {
        this.applications = response.data
      })
    },
  }
})