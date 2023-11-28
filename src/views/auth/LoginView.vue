<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '../../router'

const authStore = await useAuthStore()

const form = ref({
  login: '',
  password: ''
})

const validForm = computed(() => {
  return form.value.login !== '' && form.value.password !== '' && form.value.password.length >= 8
})

const errorMessage = ref('')

async function onSubmitForm() {
  authStore.login(form.value.login, form.value.password).then((loggedIn: boolean) => {
    if (loggedIn) {
      router.push('/home')
    } else {
      errorMessage.value = 'Invalid credentials'
    }
  })
}
</script>

<template>
  <div class="main-container flex-row middle center">
    <form class="flex-col center middle">
      <h1>Login</h1>
      <input
        type="text"
        v-model="form.login"
        class="basic"
        id="login"
        placeholder="Enter username"
      />
      <input
        type="password"
        v-model="form.password"
        class="basic"
        id="password"
        placeholder="Password"
      />
      <p v-if="errorMessage.length > 0" class="error-message">{{ errorMessage }}</p>
      <button type="submit" @click="onSubmitForm()" class="primary" :disabled="!validForm">
        Submit
      </button>
    </form>
    <img class="illustration" src="@/assets/illustrations/auth.svg" alt="login illustration" />
  </div>
</template>

<style scoped lang="scss">
.illustration {
  width: 50vw;
  max-width: 500px;

  @include width-under(600px) {
    display: none;
  }
}

.error-message {
  font-size: 0.7rem;
  padding: 0.5rem;
  color: $red;
  width: 100%;
  text-align: center;
}
</style>
