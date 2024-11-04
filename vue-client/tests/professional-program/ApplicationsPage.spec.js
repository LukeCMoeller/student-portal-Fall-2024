import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { describe, it, expect, beforeEach } from 'vitest'
import ApplicationsPage from '@/sub-apps/professional-program-app/ApplicationsPage.vue'

// Mock store creation
const createMockStore = (state) => {
  return createStore({
    state,
  });
};

describe('ApplicationsPage tests', () => {
    let wrapper
    let store

    beforeEach(() => {
        // Create store with necessary initial state
        store = createMockStore({
            IsAdminMode: false,
        });

        // Mount component with the mock store
        wrapper = mount(ApplicationsPage, {
            global: {
                plugins: [store],
            },
        });
    })

    it("Should render the ApplicationsPage", () => {
        const applications = wrapper.findComponent(ApplicationsPage)
        expect(applications.exists()).toBe(true)
    })
})
