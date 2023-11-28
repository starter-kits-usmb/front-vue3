<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import router from '../../router'
import type { AuthPayload } from '../../models/auth-payload'

const authStore = useAuthStore()
const userStore = useUserStore()

const profile = ref<AuthPayload>()

async function logout() {
  await authStore.logout()
  router.push('/auth/login')
}

onMounted(async () => {
  profile.value = await userStore.getProfile()
})
</script>

<template>
  <div class="main-container flex-col center middle">
    <h2>Welcome {{ profile?.login }}</h2>
    <button class="danger" @click="logout()">Logout</button>
  </div>
</template>

<style scoped lang="scss"></style>
