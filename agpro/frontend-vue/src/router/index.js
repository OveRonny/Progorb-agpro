import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  useUserStore
} from '../features/users/store.js'
import LoginPage from '../features/users/views/LoginPage.vue'
import RegisterPage from '../features/users/views/RegisterPage.vue'
import DashboardPage from '../features/dashboard/views/HomePage.vue'
import CustomersPage from '../features/customers/views/CustomersPage.vue'
import ProductPage from '../features/products/views/ProductPage.vue'
import ProductTypePage from '../features/productTypes/views/ProductTypePage.vue'

export const routes = [{
    path: '/login',
    component: LoginPage,
    name: 'Login'
  },
  {
    path: '/register',
    component: RegisterPage,
    name: 'Register'
  },
  {
    path: '/',
    component: DashboardPage,
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/customers',
    component: CustomersPage,
    name: 'Customers',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products',
    component: ProductPage,
    name: 'Products',
    meta: {
      requiresAuth: true
    }
  },
   {
    path: '/product-types',
    component: ProductTypePage,
    name: 'Product-types',
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