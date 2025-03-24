// Imports
import { defineStore } from 'pinia'
import Logger from 'js-logger'

// Services
import api from '@/services/tokenApi'

export const useApplicationStore = defineStore('application', {
  state: () => {
    return {
        application: {
          semester: '',
          status: '',
          notes: '',
          waiver: false
        },
        user_id: 2,
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
        await api.get('/api/v1/protected/applications/self').then((response) => {
          if(response.data.application === undefined) {
            this.application.status = 'Unsubmitted'
            this.course_grades = response.data.course_grades
          } else {
            this.application = response.data.application
            this.courses = response.data.course_grades
          }
      })} catch (err) {
          Logger.error('Unknown error fetching professional program application: ', err)
      }
    },
    //Submits the application information. Server handles determining if this is an insert or update.
    async submit() {
      Logger.info('application: submit')
      await api.post('/api/v1/protected/applications/submit', {
        application: this.application,
        user_id: this.user_id
      })
    }
  }
})