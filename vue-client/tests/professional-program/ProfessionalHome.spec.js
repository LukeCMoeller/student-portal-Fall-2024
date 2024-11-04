import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { describe, it, expect, beforeEach } from 'vitest'
import ProfessionalHome from '@/sub-apps/professional-program-app/ProfessionalHome.vue'

// Mock store creation
const createMockStore = (state) => {
  return createStore({
    state,
  });
};

describe('ProfessionalHome tests', () => {
    let wrapper
    let store

    beforeEach(() => {
        // Create store with initial state
        store = createMockStore({
            IsAdminMode: false,
        });

        // Mount the component with the mock store
        wrapper = mount(ProfessionalHome, {
            global: {
                plugins: [store],
            },
        });
    })

    it("Should render the ProfessionalHome view", () => {
        const home = wrapper.findComponent(ProfessionalHome)
        expect(home.exists()).toBe(true)
    })
})
