<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const { errors } = storeToRefs(useAuthStore())
const { login } = useAuthStore()

const formData = reactive({
  email: "",
  password: "",
})

onMounted(() => {
  errors.value = {}
})

</script>

<template>
  <main>
    <h1 class="title">Login account</h1>

    <form @submit.prevent="login(formData)" class="w-1/2 mx-auto space-y-6">
      <div>
        <input type="email" placeholder="Email" v-model="formData.email">
        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
      </div>
      <div>
        <input type="text" placeholder="Password" v-model="formData.password">
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
      </div>

      <button class="primary-btn">Login</button>
    </form>
  </main>
</template>
