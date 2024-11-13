import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { describe, it, expect, beforeEach } from 'vitest'
import ProfessionalHome from '@/sub-apps/professional-program-app/ProfessionalHome.vue'
import Home from '@/components/forms/HomePage.vue'

import { createRouter, createWebHistory } from 'vue-router';

// Mock store creation
const createMockStore = (getters) => {
  return createStore({
    getters,
  });
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/apply', name: 'apply', component: Home }
    ]
})

describe('ProfessionalHome tests', () => {
    let wrapper
    let store

    beforeEach(() => {
        // Create store with initial state
        store = createMockStore({
            IsAdminMode: (state) => false,
        });

        // Mount the component with the mock store
        wrapper = mount(ProfessionalHome, {
            global: {
                plugins: [store, router],
            },
        });
    })

    it("Should render the ProfessionalHome view", () => {
        const home = wrapper.findComponent(ProfessionalHome)
        expect(home.exists()).toBe(true)
    })
})
