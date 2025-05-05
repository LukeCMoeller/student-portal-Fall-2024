// Imports
import { defineStore } from 'pinia'
import Logger from 'js-logger'

// Services
import api from '@/services/apiHook'

export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      user: {}, // user object
      academics: '',
      discord: '',
      github: ''
    }
  },
  getters: {
    full_name(state) {
      return state.user.first_name + " " + state.user.last_name
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
      await api.get('/api/v1/protected/academics').then((response) => {
        this.academics = response.data
      })
    },
    async unlinkDiscord(userId){
      try {
        return await api.delete(`/api/v1/discord/`, {
            params: { userId },
        })
        } catch (error) {
            console.error('Error unlinking Discord:', error);
        }
    },
    async unlinkGitHub(userId){
      try {
        return await api.delete(`/api/v1/github/`, {
            params: { userId },
        })
        } catch (error) {
            console.error('Error unlinking GitHub:', error);
        }
    },
    async getDiscordInfo(userId) {
      try {
        const response = await api.get(`/api/v1/discord/username`, {
            params: { userId },
        });
        this.discord = response.data.username;
        } catch (error) {
            console.log('User Discord not found.');
        }
    },
    async getGitHubInfo(userId) {
      try {
        const response = await api.get(`/api/v1/github/username`, {
            params: { userId },
        });
        this.github = response.data.username;
    } catch (error) {
        console.log('User GitHub not found.');
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