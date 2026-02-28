<template>
  <div class="min-h-screen bg-gray-950 flex items-center justify-center px-4">
    <h1>Register</h1>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue'
export default { components: { RegisterForm } }
</script>