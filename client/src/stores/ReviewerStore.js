import { defineStore } from 'pinia'
import Logger from 'js-logger'

// Services
import api from '@/services/adminApi'

// Import token store
import { useTokenStore } from './TokenStore'

export const useReviewerStore = defineStore('admin', {
  state: () => {
    return {
      applications: [],
    }
  },
  actions: {
    async fetchApplications() {
      Logger.info('admin:fetchApplications')

      // Access the token store to get the token
      const tokenStore = useTokenStore()

      // Get the token from the token store
      const token = tokenStore.token

      if (!token) {
        Logger.error('No token found')
        return
      }

      try {
        // Make API request with the token in the Authorization header
        const response = await api.get('/api/v1/protected/applications', {
          headers: {
            Authorization: `Bearer ${token}` // Send token in Authorization header
          }
        })

        this.applications = response.data
      } catch (error) {
        Logger.error('Error fetching applications:', error)
        if (error.response && error.response.status === 401) {
          Logger.error('Token expired or invalid. Please log in again.')
          // Optionally handle token expiry here (e.g., redirect to login)
        }
      }
    }
  }
})
