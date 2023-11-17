<script setup lang="ts">
import { RouterView } from 'vue-router'
import './index.scss'
import ToastComponent from './components/singletons/ToastComponent.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <Suspense>
    <NavBar></NavBar>
  </Suspense>

  <RouterView />
  <ToastComponent></ToastComponent>
</template>

<style scoped lang="scss"></style>
