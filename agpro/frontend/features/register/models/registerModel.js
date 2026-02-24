const API_URL = 'http://localhost:3000/auth';

export const RegisterModel = {
    async register(user) {
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            });
            const data = await res.json();
            if(res.ok) return { success: true };
            else return { success: false, message: data.message };
        } catch(err) {
            console.error(err);
            return { success: false, message: 'Network error' };
        }
    }
};
