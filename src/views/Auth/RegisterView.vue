<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const { errors } = storeToRefs(useAuthStore())
const { register } = useAuthStore()

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
})

onMounted(() => {
  errors.value = {}
})

</script>

<template>
  <main>
    <h1 class="title">Register account</h1>

    <form @submit.prevent="register(formData)" class="w-1/2 mx-auto space-y-6">
      <div>
        <input type="text" placeholder="Name" v-model="formData.name">
        <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>
      </div>
      <div>
        <input type="email" placeholder="Email" v-model="formData.email">
        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
      </div>
      <div>
        <input type="text" placeholder="Password" v-model="formData.password">
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
      </div>
      <div>
        <input type="text" placeholder="Confirm Password" v-model="formData.password_confirmation">
      </div>

      <button class="primary-btn">Register</button>
    </form>
  </main>
</template>
