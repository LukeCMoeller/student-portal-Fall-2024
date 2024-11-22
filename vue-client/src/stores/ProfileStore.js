// Imports
import { defineStore } from 'pinia'
import Logger from 'js-logger'

// Services
import api from '@/services/tokenApi'

export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      user: {} // user object
    }
  },
  actions: {
    /**
     * Hydrate the store by querying the API for data
     * Refreshes the data in the store
     */
    async hydrate() {
      Logger.info('profile:hydrate')
      await api.get('/api/v1/profile').then((response) => {
        this.user = response.data
      })
    },
    /**
     * Pushes the updated data of the store to the server
     * then updates the store's data
     */
    async update() {
      await api
        .post('/api/v1/profile/', {
          user: this.user
        })
        .then(async () => {
          await this.hydrate()
        })
    }
  }
})