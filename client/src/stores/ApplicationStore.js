// Imports
import { defineStore } from 'pinia'
import Logger from 'js-logger'
import { error } from 'console'

// Services

export const useApplicationStore = defineStore('application', {
  state: () => {
    return {
        application: {
          semester: '',
          status: '',
          notes: '',
          waiver: ''
        },
        user_id: '',
        //Grades for the list of courses required by the professional program.
        course_grades: {
          math_220: '',
          math_221: '',
          cis_115: '',
          cis_116: '',
          cis_200: '',
          cis_300: '',
          cis_301: '',
          ece_241: ''
        }
    }
  },
  actions: {
    //Gets information on the already submitted application (if there is one) and the courses for the application
    async hydrate() {
      Logger.info('application: hydrate')
      try {
        await api.get('/api/v1/protected/application/self').then((response) => {
          this.application = response.json().application
          this.courses = response.json().courses
      })} catch (err) {
        //404 error means the application wasn't found
        if(err.response && err.response.status === 404) {
          //Grab the information from the courses, which were sent in the error's json.
          this.application.status = 'N/A'
          this.courses = err.response.json().courses
        }
        //Anything else means something wildly unexpected happened
        else {
          Logger.error('Unknown error fetching professional program application: ', err)
        }
      }
    },
    //Submits the application information. Server handles determining if this is an insert or update.
    async submit() {
      Logger.info('application: submit')
      await api.post('/api/v1/protected/application/submit', {
        application: this.application,
        user_id: this.user_id
      })
    }
  }
})