import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import ProfilesForm from '@/sub-apps/profile-app/ProfilesForm.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTokenStore } from '@/stores/TokenStore'
import { useProfileStore } from '@/stores/ProfileStore'
import {ref} from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'

vi.mock('@/stores/ProfileStore')
vi.mock('@/stores/TokenStore')

describe('ProfilesForm tests', () => {
    let wrapper
    let profileStore
    let tokenStore

    beforeEach(() => {
        // Mock the profileStore object
        profileStore = {
          hydrate: vi.fn(),
          update: vi.fn(),
          user: ref({
            email: 'jdoe@ksu.edu',
            firstName: 'Johnathan',
            lastName: 'Doe',
            wid: '888888888'
          })
        };

        tokenStore = {
          getToken: vi.fn(),
          tryToken: vi.fn(),
          profile_updated: false
        };
    
        // Mock the return of the useStore functions
        useProfileStore.mockReturnValue(profileStore)
        useTokenStore.mockReturnValue(tokenStore);
    
        // Mount the component with the necessary plugins and mocks
        wrapper = mount(ProfilesForm, {
            global: {
              plugins: [
                createTestingPinia({
                  createSpy: vi.fn 
                })
              ],
              provide: {
                $toast: { add: vi.fn() }
              }
            }
          });
      });

    it("Should render the ProfilesForm", async () => {
        const profile = wrapper.findComponent(ProfilesForm)
        expect(profile.exists()).toBe(true)
    })

    it("Should render each of the text fields", () => {
        const firstName = wrapper.findComponent("#firstName")
        expect(firstName.exists()).toBe(true)

        const lastName = wrapper.findComponent('#lastName')
        expect(lastName.exists()).toBe(true)

        const email = wrapper.findComponent('#email')
        expect(email.exists()).toBe(true)

        const wid = wrapper.findComponent('#wid')
        expect(wid.exists()).toBe(true)
    })

    it("Should be able to change data and have it save", async () => {
        const profileStore = useProfileStore()

        const spy = vi.spyOn(wrapper.vm, 'save');
        profileStore.user.value.firstName = 'New Name'
        await wrapper.vm.save();
        expect(spy).toHaveBeenCalled()
    
        profileStore.hydrate()

        expect(profileStore.user.value.firstName).toBe('New Name');
    }) 

    it('save should show success toast on successful update', async () => {

        const toast = wrapper.vm.$toast;
        const toastSpy = vi.spyOn(toast, 'add');

        profileStore.update.mockResolvedValueOnce();

        await wrapper.vm.save();

        await wrapper.vm.$nextTick();

        expect(toastSpy).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Success',
        detail: 'Profile Updated!',
        life: 3000
        });
      })

    it.skip('should prevent a new user from leaving the profile page', async () => {
        //Try to go to home page.
        router.push('/')
        await router.isReady()
        //Should still be on profile page
        expect(useRoute().path).toBe('/profile')
    })
})
