import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import HomePage from '@/components/forms/HomePage.vue'

describe('HomePage tests', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(HomePage)
    })


    it("Should render the HomePage", () => {
        const home = wrapper.findComponent(HomePage)

        expect(home.exists()).toBe(true)
    })
})