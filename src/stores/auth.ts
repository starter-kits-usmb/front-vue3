import { defineStore } from 'pinia'
import { ref } from 'vue'
import { env } from '../env'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const connected = ref(false)

  const API = env.API_URL

  function setupFromLocalStorage() {
    token.value = localStorage.getItem('token') || ''
    connected.value = !!token.value
    console.log('setupFromLocalStorage', token.value, connected.value)
  }

  async function isTokenValid() {
    try {
      const response = await fetch(API + '/auth', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  async function login(login: string, password: string) {
    const response = await fetch(API + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password })
    })

    if (response.ok) {
      const data = await response.json()
      if (data.token) {
        token.value = data.token
        localStorage.setItem('token', data.token)
        connected.value = true
        return true
      }
    }

    return false
  }

  async function register(login: string, password: string) {
    try {
      const response = await fetch(API + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.id) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  async function logout() {
    token.value = ''
    localStorage.removeItem('token')
    connected.value = false
  }

  // Call the setup function when the store is created
  setupFromLocalStorage()

  return {
    token,
    connected,
    isTokenValid,
    login,
    register,
    logout
  }
})
