<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
const authStore = await useAuthStore()
const phoneMenuOpen = ref(false)
</script>

<template>
  <nav class="flex-row btw middle">
    <!-- Logo -->
    <div>
      <router-link to="/" class="logo" @click="phoneMenuOpen = false">
        <img src="@/assets/icons/logo.svg" alt="logo" />
      </router-link>
    </div>

    <!-- Nav items -->
    <div class="flex-row middle menu content" :class="{ active: phoneMenuOpen }">
      <router-link
        to="/starter-kit"
        @click="phoneMenuOpen = false"
        :class="{ active: $route.path === '/starter-kit' }"
        >Starter kit</router-link
      >
      <router-link
        v-if="!authStore.connected"
        to="/auth/login"
        @click="phoneMenuOpen = false"
        :class="{ active: $route.path === '/auth/login' }"
        >Login</router-link
      >
      <router-link
        v-if="!authStore.connected"
        to="/auth/register"
        @click="phoneMenuOpen = false"
        :class="{ active: $route.path === '/auth/register' }"
        class="btn primary"
        >Sign-up</router-link
      >
      <router-link
        v-if="authStore.connected"
        to="/user/profile"
        @click="phoneMenuOpen = false"
        :class="{ active: $route.path === '/user/profile' }"
        >Profil</router-link
      >
    </div>
    <div class="menu nav-icon">
      <img
        v-if="!phoneMenuOpen"
        @click="phoneMenuOpen = true"
        src="assets/icons/navbar.svg"
        alt="open menu"
      />
      <img
        v-if="phoneMenuOpen"
        @click="phoneMenuOpen = false"
        src="assets/icons/close.svg"
        alt="close menu"
      />
    </div>
  </nav>
</template>

<style scoped lang="scss">
nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: $nav-height;
  width: calc(100% - 2rem);
  background-color: $background;
  padding: 0 1rem;
  a {
    text-decoration: none;
    color: $text1;
    u &:visited {
      color: $text1;
    }
  }

  .nav-icon {
    display: none;

    @include width-under(800px) {
      display: block;
    }
    img {
      width: 50px;
      height: 50px;
    }
  }

  .logo {
    img {
      height: calc($nav-height - 1rem);
    }
  }

  .menu {
    @include width-under(800px) {
      display: none;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 2rem;
      &.active,
      &.nav-icon {
        display: flex;
      }

      &.content {
        position: absolute;
        top: $nav-height;
        left: 0;
        width: 100%;
        min-height: calc(100vh - $nav-height);
        background-color: $background;
        z-index: 10000;

        a,
        p {
          font-size: 3rem;
        }
      }
    }
  }
}
</style>
