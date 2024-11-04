import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import ApplicationForm from '@/sub-apps/professional-program-app/ApplicationForm.vue'

describe('ApplicationForm tests', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(ApplicationForm)
    })


    it("Should render the ApplicationForm", () => {
        const applicationForm = wrapper.findComponent(ApplicationForm)

        expect(applicationForm.exists()).toBe(true)
    })
})