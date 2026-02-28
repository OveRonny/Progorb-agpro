<template>
  <form @submit.prevent="handleSubmit"
        class="w-full max-w-5xl mx-auto bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-800 space-y-6">

    <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-4">Ny kunde</h2>
    
    <div class="flex gap-6 items-center text-white justify-center">
      <label class="flex items-center gap-2">
        <input type="radio" v-model="isPerson" :value="true" /> Person
      </label>
      <label class="flex items-center gap-2">
        <input type="radio" v-model="isPerson" :value="false" /> Firma
      </label>
    </div>
   
    <div v-if="isPerson" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col">
        <label for="firstName" class="text-gray-400 mb-1">Fornavn</label>
        <input v-model="firstName" type="text" id="firstName" class="input" required />
      </div>
      <div class="flex flex-col">
        <label for="lastName" class="text-gray-400 mb-1">Etternavn</label>
        <input v-model="lastName" type="text" id="lastName" class="input" required />
      </div>
    </div>
   
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <div class="flex flex-col">
        <label for="companyName" class="text-gray-400 mb-1">Firmanavn</label>
        <input v-model="companyName" type="text" id="companyName" class="input" required />
      </div>
      <div class="flex flex-col">
        <label for="vatNumber" class="text-gray-400 mb-1">Org nr</label>
        <input v-model="vatNumber" type="text" id="vatNumber" class="input" />
      </div>
    </div>
    
     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col">
        <label for="customerNumber" class="text-gray-400 mb-1">Kunde nr</label>
        <input v-model="customerNumber" type="number" id="customerNumber" class="input" required />
      </div>
      <div class="flex flex-col">
        <label for="email" class="text-gray-400 mb-1">Email</label>
        <input v-model="email" type="email" id="email" class="input" required />
      </div>
      <div class="flex flex-col">
        <label for="phone" class="text-gray-400 mb-1">Telefon</label>
        <input v-model="phone" type="text" id="phone" class="input" required />
      </div>
      <div class="flex flex-col">
        <label for="billingAddress" class="text-gray-400 mb-1">Adresse</label>
        <input v-model="billingAddress" type="text" id="billingAddress" class="input" required />
      </div>
      <div class="flex flex-col">
        <label for="billingPostal" class="text-gray-400 mb-1">Postnummer</label>
        <input v-model="billingPostal" type="text" id="billingPostal" class="input" required />
      </div>
      <div class="flex flex-col">
        <label for="billingCity" class="text-gray-400 mb-1">By</label>
        <input v-model="billingCity" type="text" id="billingCity" class="input" required />
      </div>
    </div>

    <button type="submit"
            class="px-6 py-3 md:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white ">
     {{ editingCustomer ? (loading ? "Oppdaterer..." : "Oppdater") : (loading ? "Lagrer..." : "Lagre kunde") }}
    </button>

    <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
    <p v-if="success" class="text-green-500 text-sm text-center">{{ success }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useCustomerStore } from '../store'

const editingCustomer = ref(null)
const customerStore = useCustomerStore()

const isPerson = ref(true)
const customerNumber = ref('')
const firstName = ref('')
const lastName = ref('')
const companyName = ref('')
const vatNumber = ref('')
const email = ref('')
const phone = ref('')
const billingAddress = ref('')
const billingPostal = ref('')
const billingCity = ref('')

const loading = ref(false)
const error = ref('')
const success = ref('')

const editCustomer = (customer) => {
  editingCustomer.value = customer
  isPerson.value = customer.isPerson
  customerNumber.value = customer.customerNumber
  firstName.value = customer.firstName || ''
  lastName.value = customer.lastName || ''
  companyName.value = customer.companyName || ''
  vatNumber.value = customer.vatNumber || ''
  email.value = customer.email
  phone.value = customer.phone
  billingAddress.value = customer.billingAddress
  billingPostal.value = customer.billingPostal
  billingCity.value = customer.billingCity
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const customer = {
      id: editingCustomer.value?.id,
      isPerson: isPerson.value,
      customerNumber: customerNumber.value,
      firstName: firstName.value,
      lastName: lastName.value,
      companyName: companyName.value,
      vatNumber: vatNumber.value,
      email: email.value,
      phone: phone.value,
      billingAddress: billingAddress.value,
      billingPostal: billingPostal.value,
      billingCity: billingCity.value
    }

     if (editingCustomer.value) {
      await customerStore.updateCustomer(editingCustomer.value.id, customer)       
    } else {
      await customerStore.addCustomer(customer)       
    }  

    customerNumber.value = ''
    firstName.value = ''
    lastName.value = ''
    companyName.value = ''
    vatNumber.value = ''
    email.value = ''
    phone.value = ''
    billingAddress.value = ''
    billingPostal.value = ''
    billingCity.value = ''

    editingCustomer.value = null

  } catch (err) {
    error.value = err.message || 'Noe gikk galt'
  } finally {
    loading.value = false
  }
}
defineExpose({ editCustomer })
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #1f2937; /* bg-gray-800 */
  border: 1px solid #374151; /* border-gray-700 */
  color: white;
}
.input::placeholder {
  color: #9ca3af;
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6; /* focus:ring-blue-500 */
}
</style>