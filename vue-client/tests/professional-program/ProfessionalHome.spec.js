import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { describe, it, expect, beforeEach } from 'vitest'
import ProfessionalHome from '@/sub-apps/professional-program-app/ProfessionalHome.vue'

//Route imports
import Error from '@/components/common/ErrorPage.vue'
import Home from '@/components/forms/HomePage.vue'
import professionalRoutes from '@/sub-apps/professional-program-app/routes'
import ProfessionalProgram from '@/sub-apps/professional-program-app/ProfessionalProgram.vue'
import ProfileRoutes from '@/sub-apps/profile-app/ProfileRoutes'

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
