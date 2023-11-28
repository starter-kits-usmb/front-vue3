<script setup lang="ts">
import { defineProps } from 'vue'
import { type ModalOptions } from '@/models/modal/modal-options'
import { type ModalPayload } from '@/models/modal/modal-payload'

const emit = defineEmits(['close'])
let closeEventCounter = 0

const props = defineProps({
  options: {
    type: Object as () => ModalOptions,
    required: true
  },
  validator: {
    type: Boolean,
    default: true
  }
})

function confirmModal(payload: ModalPayload = { success: true }): void {
  console.log('confirmModal called')
  closeEventCounter++
  props.options.onConfirm?.(payload)
  emit('close')
}

function cancelModal(payload: ModalPayload = { success: false }): void {
  console.log('cancelModal called')
  closeEventCounter++
  props.options.onCancel?.(payload)
  emit('close')
}
</script>

<template>
  <div>
    <div class="modal flex-col center middle">
      <h2>{{ options.title ? options.title : 'no title' }}</h2>
      <p v-if="options.message">{{ options.message }}</p>
      <div class="flex-row middle center">
        <button
          :class="[options.cancelColor ? options.cancelColor : 'basic', 'big']"
          @click="cancelModal()"
        >
          {{ options.cancelText ? options.cancelText : 'No' }}
        </button>
        <button
          :class="[options.confirmColor ? options.confirmColor : 'primary', 'big']"
          :disabled="!validator"
          @click="confirmModal()"
        >
          {{ options.confirmText ? options.confirmText : 'Yes' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background: $background;
  box-shadow: $shadow;
  border-radius: $radius;
  padding: 1.5rem 0rem;
  gap: 2rem;
  button {
    min-width: 200px;
  }
}
</style>
