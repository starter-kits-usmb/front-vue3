<script setup lang="ts">
import { RouterView } from 'vue-router'
import './index.scss'
import ToastComponent from './components/singletons/ToastComponent.vue'
import NavBar from './components/NavBar.vue'
import ModalInjector from './components/ModalInjector.vue'
import { useModalStore } from './stores/modal'
</script>

<template>
  <Suspense>
    <NavBar></NavBar>
  </Suspense>

  <RouterView />
  <ToastComponent></ToastComponent>
  <ModalInjector class="modals"></ModalInjector>
</template>

<style scoped lang="scss"></style>
