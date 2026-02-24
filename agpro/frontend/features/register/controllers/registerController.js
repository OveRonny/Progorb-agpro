import { RegisterModel } from '../models/registerModel.js';
import { RegisterView } from '../views/registerView.js';
import { AppController } from '../../../controllers/appController.js';

export const RegisterController = {
    showRegister() {
        const appDiv = document.getElementById('app');
        appDiv.innerHTML = RegisterView.render();

        document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
     
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if(password !== confirmPassword){
                document.getElementById('register-error').textContent = 'Passwords do not match';
                return;
            }

            const result = await RegisterModel.register({email, password });
            if(result.success){
                alert('Registration successful! You can now login.');
                AppController.showLogin();
            } else {
                document.getElementById('register-error').textContent = result.message;
            }
        });

        document.getElementById('go-to-login').addEventListener('click', () => {
            AppController.showLogin();
        });
    }
};
