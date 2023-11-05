import { defineStore } from 'pinia'
import { ToastLevel } from '@/models/toast-level'

export const useToast = defineStore('toast', {
  state: () => {
    return {
      visible: false,
      message: '',
      type: 'error',
      triggerNumber: 0,
      loadingMessage: '',
      loading: false,
      loadingScreenClass: ''
    }
  },
  actions: {
    Show(message: string, type: ToastLevel) {
      this.triggerNumber++
      this.HidePrevious()

      setTimeout(() => {
        this.visible = true
        this.message = message
        this.type = type

        setTimeout(() => {
          this.triggerNumber--
          if (this.triggerNumber == 0) this.HidePrevious()
        }, 3 * 1000)
      }, 10)
    },
    HidePrevious() {
      this.visible = false
      this.message = ''
    },

    ShowLoading(message: string) {
      this.loadingMessage = message
      this.loading = true
    },

    async HideLoading() {
      this.loadingScreenClass = 'fade-out'
      await new Promise((resolve) => setTimeout(resolve, 300))
      this.loadingScreenClass = ''
      this.loadingMessage = ''
      this.loading = false
    }
  }
})
