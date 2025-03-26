// Imports
import { defineStore } from 'pinia'
import Logger from 'js-logger'

// Services
import api from '@/services/tokenApi'

export const useApplicationStore = defineStore('application', {
  state: () => {
    return {
      status: {
        cis_115: "",
        cis_200: "",
        cis_300: "",
        cis_301: "",
        ece_241: "",
        math_220: "",
        math_221: ""
      },
      waiver: {
        cis_115: false,
        cis_200: false,
        cis_300: false,
        cis_301: false,
        ece_241: false,
        math_220: false,
        math_221: false
      },
      grade: {
        cis_115: "",
        cis_200: "",
        cis_300: "",
        cis_301: "",
        ece_241: "",
        math_220: "",
        math_221: ""
      },
      /*
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
          */
    }
  },
  getters: {
    application_table(state) {
      return [
        {class_descr: "CIS 115", status: this.status.cis_115, waiver: this.waiver.cis_115, grade: this.grade.cis_115},
        {class_descr: "CIS 200", status: this.status.cis_200, waiver: this.waiver.cis_200, grade: this.grade.cis_200},
        {class_descr: "CIS 300", status: this.status.cis_300, waiver: this.waiver.cis_300, grade: this.grade.cis_300},
        {class_descr: "CIS 301", status: this.status.cis_301, waiver: this.waiver.cis_301, grade: this.grade.cis_301},
        {class_descr: "ECE 241", status: this.status.ece_241, waiver: this.waiver.ece_241, grade: this.grade.ece_241},
        {class_descr: "MATH 220", status: this.status.math_220, waiver: this.waiver.math_220, grade: this.grade.math_220},
        {class_descr: "MATH 221", status: this.status.math_221, waiver: this.waiver.math_221, grade: this.grade.math_221},
      ]
    }
  },
  actions: {
    //Gets information on the already submitted application (if there is one) and the courses for the application
    async hydrate() {
      Logger.info('application: hydrate')
      try {
        await api.get('/api/v1/protected/applications/self').then((response) => {
          if(response.data.application === undefined) {
            //this.application.status = 'Unsubmitted'
            this.course_grades = response.data.course_grades
          } else {
            //this.application = response.data.application
            this.grade = response.data.course_grades
          }
      })} catch (err) {
          Logger.error('Unknown error fetching professional program application: ', err)
      }
    },
    //Submits the application information. Server handles determining if this is an insert or update.
    async submit() {
      Logger.info('application: submit')
      await api.post('/api/v1/protected/applications/submit', {
        //application: this.application,
        user_id: this.user_id
      })
    }
  }
})