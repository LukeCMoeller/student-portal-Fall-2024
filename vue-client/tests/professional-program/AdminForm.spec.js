import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import AdminForm from '@/sub-apps/professional-program-app/AdminForm.vue'

describe('AdminForm tests', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(AdminForm)
    })


    it("Should render the AdminForm", () => {
        const adminForm = wrapper.findComponent(AdminForm)

        expect(adminForm.exists()).toBe(true)
    })

    it("Should render the datatable", () => {
        const table = wrapper.findComponent("#applicationTable")
        expect(table.exists()).toBe(true)
    })
})