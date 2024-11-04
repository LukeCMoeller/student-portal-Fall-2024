import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import ProfilesForm from '@/sub-apps/profile-app/ProfilesForm.vue'

// Mock axios
vi.mock('axios', () => {
    const axiosInstance = {
        get: vi.fn().mockResolvedValue({ data: { firstname: 'Test', lastname: 'User', wid: 77777, email:'text@ksu.edu' } }),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    }
    return {
        default: {
            create: () => axiosInstance,
            ...axiosInstance, 
        },
    }
})

// Mock Pinia
const createTestPinia = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

describe('ProfilesForm tests', () => {
    let wrapper
    let pinia

    beforeEach(() => {
        pinia = createTestPinia()

        wrapper = mount(ProfilesForm, {
            global: {
                plugins: [pinia], 
            },
        })
    })

    it("Should render the ProfilesForm", () => {
        const profile = wrapper.findComponent(ProfilesForm)
        expect(profile.exists()).toBe(true)
    })

    it("Should make a mock axios GET request", async () => {

        expect(axios.get).toHaveBeenCalled()
        
    })
})
