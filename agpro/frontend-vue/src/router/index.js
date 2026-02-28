import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  useUserStore
} from '../features/users/store.js'


export const routes = [{
    path: '/login',
    component: () => import('../features/users/views/LoginPage.vue'),
    name: 'Login'
  },
  {
    path: '/register',
    component: () => import('../features/users/views/RegisterPage.vue'),
    name: 'Register'
  },
  {
    path: '/',
    component: () => import('../features/dashboard/views/HomePage.vue'),
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    }
  },  
   {
    path: '/customers',
    component: () => import('../features/customers/views/CustomersPage.vue'),
    name: 'Customers',
    meta: {
      requiresAuth: true
    }
  }

  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const userStore = useUserStore()
  
  if (userStore.token && !userStore.user) {
    try {
      await userStore.fetchProfile() 
    } catch {
      userStore.logout()
      return '/login' 
    }
  }
  
  if (to.meta.requiresAuth && !userStore.token) {
    return '/login'
  }
})

export default router