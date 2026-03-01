<template>
  <nav class="bg-gray-800 p-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      
      
      <div class="flex items-center space-x-6">
        <div class="text-white font-bold text-lg">MinApp</div>

        <router-link
          v-for="route in navRoutes"
          :key="route.path"
          :to="route.path"
          class="text-gray-300 hover:text-white px-3 py-2 rounded-md"
          active-class="bg-gray-900 text-white"
        >
          {{ route.name }}
        </router-link>
      </div>

      
      <div class="flex items-center gap-4">
        
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-bold"
        >
          {{ userInitial }}
        </div>

        <!-- E-post (valgfritt) -->
        <span class="text-gray-300 text-sm">{{ userEmail }}</span>

        <!-- Logout knapp -->
        <button
          @click="logout"
          class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../features/users/store.js'
import { useRouter } from 'vue-router'


const userStore = useUserStore()
const router = useRouter()


const logout = () => {
  userStore.logout()
  router.push('/login')
}


const props = defineProps({
  routes: {
    type: Array,
    required: true
  }
})

const navRoutes = computed(() =>
  props.routes.filter(r => r.name === 'Dashboard' || r.name === 'Customers' 
  || r.name === 'Products' || r.name === 'Product-types')
)

const userInitial = computed(() => userStore.user?.email?.charAt(0).toUpperCase() || '?')
const userEmail = computed(() => userStore.user?.email || '')
</script>