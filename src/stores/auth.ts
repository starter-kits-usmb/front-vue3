import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', async () => {
  const token = ref('')
  const connected = ref(false)

  function setupFromLocalStorage() {
    token.value = localStorage.getItem('token') || ''
    connected.value = !!token.value
  }

  async function isTokenValid() {
    try {
      const response = await fetch('/auth', {
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
    try {
      const response = await fetch('/auth/login', {
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

  async function register(login: string, password: string) {
    try {
      const response = await fetch('/auth/register', {
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
