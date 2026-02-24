export const LoginView = {
    render() {
        return `
            <h2>Login</h2>
            <form id="login-form">
                <input type="email" id="email" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? 
               <span id="go-to-register" style="color:blue; cursor:pointer;">Register here</span>
            </p>
            <div id="login-error" style="color:red"></div>
        `;
    }
};
