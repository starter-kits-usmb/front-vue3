import { defineStore } from 'pinia'
import { env } from '../env'
import { useAuthStore } from './auth'
import type { AuthPayload } from '../models/auth-payload'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const API = env.API_URL

  const profile = ref<AuthPayload>()
  const auth = useAuthStore()

  async function getProfile(forceLoad = false) {
    if (!forceLoad && profile.value) {
      return profile.value
    }

    const response = await fetch(API + '/user/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      profile.value = await response.json()
    }

    return profile.value
  }

  return {
    getProfile
  }
})
