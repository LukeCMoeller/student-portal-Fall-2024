import {defineStore} from 'pinia'

export const useUserStore = defineStore('User', {
    state: () => ({

    }),
    getters: {

    },
    actions: {
        async fetchUser() {
            // The whoami route returns the logged-in user
            const response = await fetch(`/api/whoami`);
      
            // If we get an error status code we are not logged in, 
            // so initiate the CAS login process
            if(!response.ok) return window.location = '/api/login';
      
            // Otherwise, we have our user data
            const userData = await response.json();
            setUser(userData);
          }
    }
})