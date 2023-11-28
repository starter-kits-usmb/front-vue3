import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ModalOptions } from '../models/modal/modal-options'
export const useModalStore = defineStore('modal', () => {
  const modals = ref<ModalOptions[]>([])
  const overflowHidden = ref(false)

  async function open(options?: ModalOptions) {
    overflowHidden.value = true
    if (options) {
      modals.value.push(options)
    }
  }

  function close(modal: ModalOptions) {
    modals.value = modals.value.filter((m) => m !== modal)
    if (modals.value.length === 0) {
      overflowHidden.value = false
    }
  }

  function closeAll() {
    modals.value = []
    overflowHidden.value = false
  }

  return {
    modals,
    overflowHidden,
    open,
    close,
    closeAll
  }
})
