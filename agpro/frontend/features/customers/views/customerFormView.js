export const CustomerFormView = {
    render() {
        return `
            <button id="toggle-form">Se kunde form</button>
            <input type="hidden" id="customerId" value="">
           
                <form id="add-customer-form" class="hidden">
                    <div class="radioBt">
                        <label>
                            <input type="radio" name="type" value="person" checked> Person
                        </label>
                        <label>
                            <input type="radio" name="type" value="company"> Company
                        </label>
                    </div>

                    <div id="person-fields">
                        <input type="text" id="firstName" placeholder="First Name">
                        <input type="text" id="lastName" placeholder="Last Name">
                    </div>

                    <div id="company-fields" ">
                        <input type="text" id="companyName" placeholder="Company Name">
                        <input type="text" id="vatNumber" placeholder="VAT Number">
                    </div>

                    <input type="email" id="email" placeholder="Email" required>
                    <input type="text" id="phone" placeholder="Phone">
                    <input type="text" id="billingAddress" placeholder="Billing Address">
                    <input type="text" id="billingPostal" placeholder="Postal Code">
                    <input type="text" id="billingCity" placeholder="City">

                    <button type="submit" id="submit-btn">Lagre</button>
                </form>
            
        `;
    }
};

