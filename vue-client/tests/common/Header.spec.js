import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { describe, it, expect, beforeEach } from 'vitest'
import Header from '@/components/layout/Header.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing'
import ToggleSwitch from 'primevue/toggleswitch';
import { useTokenStore } from '@/stores/TokenStore';

//Need to figure out how to use a getter properly in the tests for the admin toggle
//DistrictList tests have a getter they mock, so start there.

// Mock store
const createMockStore = (state) => {
  return createStore({
    state,
  });
};
//I think we need to instead use the TokenStore, but mock the returned value of 
//the isAdmin() getter. Don't know where that needs to go, however.

//Mock Router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'home'},
        {path: '/professional-program', name: 'professional-program'},
        {path: '/profile', name: 'profile'},
    ]
})

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

    describe.skip("Admin toggle tests", () => {
        it("Should render if the user is an admin", () => {
            //Create mock admin user
            const wrapper = mount(Header, {
                global: {
                    plugins: [router, createTestingPinia({
                        initialState: {
                            Token: {is_admin: true}
                        }
                    })]
                }
            })

            const adminToggle = wrapper.findComponent(ToggleSwitch)
            expect(adminToggle.isVisible()).toBe(true)
        })

        it("Should not render if the user is not an admin", () => {
            //Create mock admin user
            const wrapper = mount(Header, {
                global: {
                    plugins: [router, createTestingPinia({
                        initialState: {
                            Token: {is_admin: false}
                        }
                    })]
                }
            })

            const adminToggle = wrapper.findComponent(ToggleSwitch)
            expect(adminToggle.isVisible()).toBe(false)
        })
    })

    describe.skip('Header routing tests', () => {
        it('Send you to Home if you click the menu item', () => {
            //Create mock admin user
            const wrapper = mount(Header, {
                global: {
                    plugins: [router, createTestingPinia({
                        initialState: {
                            token: {is_admin: true}
                        }
                    })]
                }
            })

            //Create the token store using the testing pinia (guaranteed admin)
            const tokenStore = useTokenStore()

            //I'm not sure how to grab the specific menu item, they're being generated programatically and don't have unique classes
            const homeLink = wrapper.findComponent('')
        })
    })
})
