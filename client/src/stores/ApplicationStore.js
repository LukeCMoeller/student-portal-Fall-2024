// Imports
import { defineStore } from 'pinia'
import Logger from 'js-logger'

// Services

export const useApplicationStore = defineStore('application', {
  state: () => {
    return {
        //Application object (can just be split out if we don't need anything else)
        application: {}
        //Needs access to the ID of the current user, but this is only being used on the application page, so should be able to get that from the profile store on that page
    }
  },
  actions: {
    //Need a hydrate to get the application using the find method and the API route I haven't written yet
    //Need an update or create method using the route I have written
    //Does NOT need to use the route to get all applications, that's being handled by the AdminStore (which we should rename)
  }
})