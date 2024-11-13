import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import ProfilesForm from '@/sub-apps/profile-app/ProfilesForm.vue'
import { createTestingPinia } from '@pinia/testing'
import { useTokenStore } from '@/stores/TokenStore.js'
import { useProfileStore } from '@/stores/ProfileStore'
import {ref} from 'vue'

vi.mock('@/stores/ProfileStore')

describe('ProfilesForm tests', () => {
    let wrapper
    let profileStore
    let mockProfileStore

    beforeEach(() => {
        //Mocks the profileStore
        mockProfileStore = {
            hydrate: vi.fn().mockReturnValue(),
            update: vi.fn().mockReturnValue(),
            user: ref({
              email: 'jdoe@ksu.edu',
              firstName: 'Johnathan',
              lastName: 'Doe',
              wid: '888888888'
            }),
          }
        useProfileStore.mockReturnValue(mockProfileStore)

        //Renders the form
        wrapper = mount(ProfilesForm, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: vi.fn()
                })], 
                provide: {
                    $toast: {add: vi.fn()}
                }
            },
        })

        

        //profileStore = useProfileStore()
    })

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

        // Mock the toast plugin
        const toast = wrapper.vm.$toast
        vi.spyOn(toast, 'add')
    
        profileStore.update.mockResolvedValueOnce() // Mock a successful update
    
        await wrapper.vm.save();
    
        expect(toast.add).toHaveBeenCalledWith({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile Updated!',
          life: 3000
        })
      })
})
