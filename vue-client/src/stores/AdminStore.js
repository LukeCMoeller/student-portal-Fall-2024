import { defineStore } from 'pinia'

// Services
import api from '@/services/tokenApi'

export const useAdminStore = defineStore('admin', {
  state: () => {
    return {
      IsAdminMode: true
    }
  },
  actions: {
    
  }
})