import {
    CustomerModel
} from '../models/customerModel.js';
import {
    CustomerListView
} from '../views/customerListView.js';
import {
    CustomerFormView
} from '../views/customerFormView.js';
import {
    AppController
} from '../../../controllers/appController.js';

export const CustomerController = {

    async showCustomers() {
        const appDiv = document.getElementById('app');
        try {
            const customers = await CustomerModel.getCustomers();

            appDiv.innerHTML = CustomerFormView.render() + CustomerListView.render(customers);

            this.setupForm();
            this.setupEditButtons(customers);
            this.setupDeleteButtons(customers);
        } catch (err) {
            appDiv.innerHTML = `<p style="color:red">${err.message}</p>
                                <button id="go-login">Go to Login</button>`;
            document.getElementById('go-login').addEventListener('click', () => {
                AppController.showLogin();
            });
        }
    },

    setupForm() {
        const toggleBtn = document.getElementById('toggle-form');
        const formContainer = document.getElementById('add-customer-form');

        toggleBtn.addEventListener('click', () => {
            formContainer.classList.toggle('hidden');
        });

        const typeRadios = document.querySelectorAll('input[name="type"]');
        const personFields = document.getElementById('person-fields');
        const companyFields = document.getElementById('company-fields');

        typeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'person') {
                    personFields.style.display = '';
                    companyFields.style.display = 'none';
                } else {
                    personFields.style.display = 'none';
                    companyFields.style.display = '';
                }
            });
        });

        document.getElementById('add-customer-form')
            .addEventListener('submit', async (e) => {

                e.preventDefault();

                const id = document.getElementById('customerId').value;
                const isPerson = document.querySelector('input[name="type"]:checked').value === 'person';

                const customerData = {
                    isPerson,
                    firstName: isPerson ? document.getElementById('firstName').value.trim() : null,
                    lastName: isPerson ? document.getElementById('lastName').value.trim() : null,
                    companyName: !isPerson ? document.getElementById('companyName').value.trim() : null,
                    vatNumber: !isPerson ? document.getElementById('vatNumber').value.trim() : null,
                    email: document.getElementById('email').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    billingAddress: document.getElementById('billingAddress').value.trim(),
                    billingPostal: document.getElementById('billingPostal').value.trim(),
                    billingCity: document.getElementById('billingCity').value.trim()
                };

                try {
                    if (id) {
                        // Update eksisterende
                        await CustomerModel.updateCustomer(id, customerData);
                    } else {
                        // Ny kunde
                        await CustomerModel.addCustomer(customerData);
                    }

                    this.showCustomers(); 
                } catch (err) {
                    alert(err.message);
                }
            });
    },


    setupEditButtons(customers) {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const customer = customers.find(c => c.id == id);
                if (!customer) return;
                this.fillForm(customer);
            });
        });
    },

    setupDeleteButtons() {
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                const confirmed = confirm("Are you sure you want to delete this customer?");
                if (!confirmed) return;

                try {
                    await CustomerModel.deleteCustomer(id);
                    this.showCustomers(); // reload etter sletting
                } catch (err) {
                    alert(err.message);
                }
            });
        });
    },


    fillForm(customer) {
        document.getElementById('customerId').value = customer.id;

        const formContainer = document.getElementById('customer-form-container');
        formContainer.style.display = '';

        if (customer.isPerson) {
            document.querySelector('input[value="person"]').checked = true;
            document.getElementById('person-fields').style.display = '';
            document.getElementById('company-fields').style.display = 'none';
        } else {
            document.querySelector('input[value="company"]').checked = true;
            document.getElementById('person-fields').style.display = 'none';
            document.getElementById('company-fields').style.display = '';
        }

        document.getElementById('firstName').value = customer.firstName || '';
        document.getElementById('lastName').value = customer.lastName || '';
        document.getElementById('companyName').value = customer.companyName || '';
        document.getElementById('vatNumber').value = customer.vatNumber || '';
        document.getElementById('email').value = customer.email || '';
        document.getElementById('phone').value = customer.phone || '';
        document.getElementById('billingAddress').value = customer.billingAddress || '';
        document.getElementById('billingPostal').value = customer.billingPostal || '';
        document.getElementById('billingCity').value = customer.billingCity || '';

        document.getElementById('submit-btn').textContent = "Update Customer";
    }

};