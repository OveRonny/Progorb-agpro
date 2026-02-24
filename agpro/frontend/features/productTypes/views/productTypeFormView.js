export const ProductTypeFormView = {
    render() {
        return `
            <h2>Product Type Form</h2>
            <button id="toggle-product-form">Se produkt type form</button>
            <form id="product-type-form">
                <input type="text" id="name" placeholder="Name" required>
                <button type="submit" id="submit-btn">Lagre</button>
            </form>
        `;
    }
}