<template>
  <div id="app">
    
    <Navbar v-if="userStore.token" :routes="routes" />    
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import { useUserStore } from './features/users/store.js'
import { routes } from './router'
import { ref, onMounted } from 'vue'

const userStore = useUserStore()

const loading = ref(true)

onMounted(async () => {
  if (userStore.token) {
    await userStore.fetchProfile()  
  }
  loading.value = false
})

</script>

<style scoped></style>
