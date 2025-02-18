// Imports
import { defineStore } from 'pinia'
import Logger from 'js-logger'

// Services
import api from '@/services/tokenApi'

export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      user: {}, // user object
      discord: '',
      github: ''
    }
  },
  actions: {
    /**
     * Hydrate the store by querying the API for data
     * Refreshes the data in the store
     */
    async hydrate() {
      Logger.info('profile:hydrate')
      await api.get('/api/v1/protected/profile').then((response) => {
        this.user = response.data
      })
    },
    async unlinkDiscord(userId){
      try {
        return await api.delete(`/api/v1/protected/discord/`, {
            params: { userId },
        })
        } catch (error) {
            console.error('Error unlinking Discord:', error);
        }
    },
    async unlinkGitHub(userId){
      try {
        return await api.delete(`/api/v1/protected/github/`, {
            params: { userId },
        })
        } catch (error) {
            console.error('Error unlinking GitHub:', error);
        }
    },
    async getDiscordInfo(userId) {
      try {
        const response = await api.get(`/api/v1/protected/discord/username`, {
            params: { userId },
        });
        this.discord = response.data.username;
        } catch (error) {
            console.error('Error verifying Discord:', error);
        }
    },
    async getGitHubInfo(userId) {
      try {
        const response = await api.get(`/api/v1/protected/github/username`, {
            params: { userId },
        });
        this.github = response.data.username;
    } catch (error) {
        console.error('Error verifying GitHub:', error);
    }
    },
    /**
     * Pushes the updated data of the store to the server
     * then updates the store's data
     */
    async update() {
      await api
        .post('/api/v1/protected/profile/', {
          user: this.user
        })
        .then(async () => {
          await this.hydrate()
        })
    }
  }
})