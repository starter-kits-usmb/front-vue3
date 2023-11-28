<script setup lang="ts">
import { useToast } from '@/stores/toast'
import { ToastLevel } from '../models/toast-level'
import { useModalStore } from '../stores/modal'
import type { ModalPayload } from '../models/modal/modal-payload'
const toastStore = useToast()
const modalStore = useModalStore()

function showNotification(level: string) {
  console.log('showNotification of', level, 'called')
  toastStore.Show(`This is a ${level} toast`, level as ToastLevel)
}

function showLoadingScreen() {
  toastStore.ShowLoading('Message to show during the loading screen.')
  setTimeout(() => {
    toastStore.HideLoading()
  }, 5000)
}

function openConfirmModal() {
  modalStore.open({
    title: 'Confirm action',
    message: 'Are you sure you want to do that ?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: async (payload: ModalPayload) => {
      toastStore.Show('Modal confirmed', ToastLevel.Success)
    },
    onCancel: async (payload: ModalPayload) => {
      console.log('Modal canceled')
      toastStore.Show('Modal canceled', ToastLevel.Warning)
    }
  })
}
</script>
<template>
  <div class="main-container flex-col center">
    <h1>What's available ?</h1>
    <div class="grid-col-2">
      <!-- Toast and loading -->
      <section class="flex-col center top">
        <h2>Toasts, modal & loading screen</h2>
        <div class="flex-row wrap">
          <button class="success" @click="showNotification('success')">
            Show a success notification
          </button>
          <button class="warning" @click="showNotification('warning')">
            Show a warning notification
          </button>
          <button class="danger" @click="showNotification('error')">
            Show an error notification
          </button>
          <button class="basic" @click="openConfirmModal()">Show a confirm modal</button>
          <button class="primary" @click="showLoadingScreen()">
            Show a loading screen for 5 seconds
          </button>
        </div>
      </section>

      <!-- Light Design system -->
      <section class="flex-col center top">
        <h2>Light design system</h2>
        <div class="flex-row wrap top">
          <button class="basic">button basic</button>
          <button class="primary">button primary</button>
          <button class="success">button success</button>
          <button class="warning">button warning</button>
          <button class="danger">button danger</button>
          <input type="text" class="basic" placeholder="basic input" />
          <select class="basic">
            <option value="1">option 1</option>
            <option value="2">option 2</option>
          </select>
          <textarea class="basic" placeholder="basic textarea"></textarea>
        </div>
      </section>

      <section class="flex-col center top">
        <!-- Authentification -->
        <h2>Authentification</h2>
        <p>
          An authentification store in /stores, ready to be linked with your backend. See the
          README.
        </p>
      </section>
    </div>
  </div>
</template>
<style lang=""></style>
