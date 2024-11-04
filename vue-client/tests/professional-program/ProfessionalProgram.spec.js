import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import ProfessionalProgram from '@/sub-apps/professional-program-app/ProfessionalProgram.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Mock route
const routes = [
  {
    path: '/professional-program',
    component: ProfessionalProgram
  },
];

//Mock router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('ProfessionalProgram tests', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(ProfessionalProgram, {
            global: {
                plugins: [router],
            },
        })
    })

    it("Should render the ProfessionalProgram view", () => {
        const prof = wrapper.findComponent(ProfessionalProgram)
        expect(prof.exists()).toBe(true)
    })
})
