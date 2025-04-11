import { defineStore } from 'pinia'
import Logger from 'js-logger'

// Services
import api from '@/services/adminApi'

// Import token store
import { useTokenStore } from './TokenStore'

export const useStudentStore = defineStore('student', {
  state: () => {
    return {
        courses: [
            {class: 'CIS 115', section: 'A', status: 'Complete', grade: 'A', credit_hours: '3', instructor: 'Josh Weese'},
            {class: 'CIS 101', section: 'B', status: 'Complete', grade: 'B+', credit_hours: '4', instructor: 'Sarah Collins'},
            {class: 'CIS 205', section: 'C', status: 'In Progress', grade: 'N/A', credit_hours: '3', instructor: 'Emily Johnson'},
            {class: 'CIS 220', section: 'A', status: 'Complete', grade: 'A-', credit_hours: '3', instructor: 'John Smith'},
            {class: 'CIS 300', section: 'D', status: 'Complete', grade: 'B', credit_hours: '4', instructor: 'Samantha Lee'},
            {class: 'MATH 101', section: 'A', status: 'Complete', grade: 'B-', credit_hours: '3', instructor: 'Kevin Wright'},
            {class: 'MATH 202', section: 'B', status: 'In Progress', grade: 'N/A', credit_hours: '3', instructor: 'Olivia Davis'},
            {class: 'ENG 101', section: 'A', status: 'Complete', grade: 'C+', credit_hours: '3', instructor: 'Danielle Miller'},
            {class: 'ENG 202', section: 'C', status: 'Complete', grade: 'A', credit_hours: '3', instructor: 'Adam Brown'},
            {class: 'PHY 101', section: 'B', status: 'In Progress', grade: 'N/A', credit_hours: '4', instructor: 'Liam Taylor'},
            {class: 'BIO 110', section: 'A', status: 'Complete', grade: 'B+', credit_hours: '4', instructor: 'Rachel Green'},
            {class: 'CHEM 150', section: 'A', status: 'Complete', grade: 'A-', credit_hours: '4', instructor: 'Michael Moore'},
            {class: 'HIST 130', section: 'D', status: 'In Progress', grade: 'N/A', credit_hours: '3', instructor: 'Sophia Turner'},
            {class: 'SOC 101', section: 'A', status: 'Complete', grade: 'C', credit_hours: '3', instructor: 'James Wilson'},
            {class: 'ART 101', section: 'B', status: 'Complete', grade: 'B+', credit_hours: '3', instructor: 'Rachel Scott'},
            {class: 'PHY 202', section: 'C', status: 'Complete', grade: 'B-', credit_hours: '4', instructor: 'Jack Harris'},
            {class: 'PSY 100', section: 'A', status: 'Complete', grade: 'A', credit_hours: '3', instructor: 'Grace Lee'},
            {class: 'ECO 200', section: 'B', status: 'In Progress', grade: 'N/A', credit_hours: '3', instructor: 'Benjamin Clark'},
            {class: 'CIS 350', section: 'A', status: 'Complete', grade: 'A+', credit_hours: '3', instructor: 'Lucas Adams'},
            {class: 'MUS 101', section: 'C', status: 'Complete', grade: 'B+', credit_hours: '3', instructor: 'Jessica Harris'}
        ]
        
    }
  }
})
