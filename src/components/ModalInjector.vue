<script setup lang="ts">
import { watch } from 'vue'
import { useModalStore } from '@/stores/modal'
import ModalComponent from './ModalComponent.vue'
const modalStore = useModalStore()

//listen for changes of modalStore.overflowHidden. console.log when it changes
watch(
  () => modalStore.overflowHidden,
  (newValue, oldValue) => {
    // if (newValue) {
    //   document.body.style.overflow = 'hidden'
    // } else {
    //   document.body.style.overflow = 'auto'
    // }
  }
)
</script>
<template>
  <div>
    <div v-if="modalStore.modals.length > 0" class="modals flex-row center middle w-full h-full">
      <ModalComponent
        v-for="modalOptions in modalStore.modals"
        :key="modalOptions.title"
        :options="modalOptions"
        @close="modalStore.close(modalOptions)"
      >
      </ModalComponent>
    </div>
  </div>
</template>
<style lang="scss">
.modals {
  position: fixed;
  top: 0;
  background-color: rgba($color: #000000, $alpha: 0.2);
  z-index: 1000;
}
</style>
