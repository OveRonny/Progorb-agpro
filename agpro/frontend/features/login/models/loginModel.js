const API_URL = 'http://localhost:3000/auth';

export const LoginModel = {
    async login(email, password) {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if(res.ok) {
                localStorage.setItem('token', data.token); // lagrer JWT
                return { success: true, data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (err) {
            console.error(err);
            return { success: false, message: 'Network error' };
        }
    }, 

    logout() {
        localStorage.removeItem('token');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }
};
