import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { describe, it, expect, beforeEach } from 'vitest'
import Header from '@/components/layout/Header.vue'

// Mock store
const createMockStore = (state) => {
  return createStore({
    state,
  });
};

describe('Header tests', () => {
    let wrapper
    let store

    beforeEach(() => {
        // Create store with initial state
        store = createMockStore({
            IsAdminMode: false,
        });

        // Mount the component with the mock store
        wrapper = mount(Header, {
            global: {
                plugins: [store],
            },
        });
    })

    it("Should render the Header", () => {
        const header = wrapper.findComponent(Header)
        expect(header.exists()).toBe(true)
    })
})
