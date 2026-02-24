// views/registerView.js
export const RegisterView = {
    render() {
        return `
            <h2>Register</h2>
            <form id="register-form">               
                <input type="email" id="email" placeholder="Email" required>
                <input type="password" id="password" placeholder="Password" required>
                <input type="password" id="confirm-password" placeholder="Confirm Password" required>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <span id="go-to-login" style="cursor:pointer;color:blue;">Login here</span></p>
            <div id="register-error"></div>
        `;
    }
};
