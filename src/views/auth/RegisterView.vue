<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '../../router'

const authStore = useAuthStore()

const form = ref({
  login: '',
  password: '',
  passwordVerification: ''
})

const validForm = computed(() => {
  if (form.value.password !== form.value.passwordVerification) {
    errorMessage.value = 'Passwords do not match'
  } else {
    errorMessage.value = ''
  }
  return (
    form.value.login !== '' &&
    form.value.password !== '' &&
    form.value.password.length >= 8 &&
    form.value.password === form.value.passwordVerification
  )
})

const errorMessage = ref('')

async function onSubmitForm() {
  authStore.register(form.value.login, form.value.password).then((registered: boolean) => {
    if (registered) {
      router.push('/auth/login')
    } else {
      errorMessage.value = 'Invalid credentials'
    }
  })
}
</script>
<template>
  <div class="main-container flex-row middle center">
    <form class="flex-col center middle" @submit.prevent="onSubmitForm()">
      <h1>Sign-up</h1>
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
      <input
        type="password"
        v-model="form.passwordVerification"
        class="basic"
        id="password"
        placeholder="Confirm password"
      />
      <p v-if="errorMessage.length > 0" class="error-message">{{ errorMessage }}</p>
      <p v-if="errorMessage.length === 0" class="pwd-info">
        Password must have 8 character minimum
      </p>
      <button type="submit" class="primary" :disabled="!validForm">Submit</button>
    </form>
    <img class="illustration" src="@/assets/illustrations/auth.svg" alt="register illustration" />
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

.pwd-info {
  font-size: 0.7rem;
}
</style>
