// Imports
import { defineStore } from 'pinia'
import Logger from 'js-logger'
import { error } from 'console'

// Services

export const useApplicationStore = defineStore('application', {
  state: () => {
    return {
        //Application object (can just be split out if we don't need anything else)
        application: {},
        user_id: '',

    }
  },
  actions: {
    //Need a hydrate to get the application using the find method and the API route I haven't written yet
    async hydrate() {
      Logger.info('application: hydrate')
      try {
        await api.get('/api/v1/protected/application/self').then((response) => {
          this.application = response.data
      })} catch (err) {
        //404 error means the application wasn't found
        if(err.response && err.response.status === 404) {

        }
        //Anything else means something wildly unexpected happened
        else {
          Logger.error('Unknown error fetching professional program application: ', err)
        }
      }
    },
    //Need an update or create method using the route I have written
    async submit() {
      Logger.info('application: submit')
      await api.post('/api/v1/protected/application/submit', {
        application: this.application,
        user_id: this.user_id
      })
    }
    //Does NOT need to use the route to get all applications, that's being handled by the AdminStore (which we should rename)
  }
})