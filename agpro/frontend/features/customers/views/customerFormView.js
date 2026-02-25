export const CustomerFormView = {
    render() {

        const container = document.createElement("div");

        const toggleBtn = document.createElement("button");
        toggleBtn.id = "toggle-form";
        toggleBtn.textContent = "Se kunde form";
        container.appendChild(toggleBtn);

        const customerIdInput = document.createElement("input");
        customerIdInput.type = "hidden";
        customerIdInput.id = "customerId";
        container.appendChild(customerIdInput);

        const form = document.createElement("form");
        form.id = "add-customer-form";
        form.classList.add("hidden");

        const radioDiv = document.createElement("div");
        radioDiv.classList.add("radioBt");

        const personLabel = document.createElement("label");
        const personRadio = document.createElement("input");
        personRadio.type = "radio";
        personRadio.name = "type";
        personRadio.value = "person";
        personRadio.checked = true;
        personLabel.appendChild(personRadio);
        personLabel.appendChild(document.createTextNode(" Person"));

        const companyLabel = document.createElement("label");
        const companyRadio = document.createElement("input");
        companyRadio.type = "radio";
        companyRadio.name = "type";
        companyRadio.value = "company";
        companyLabel.appendChild(companyRadio);
        companyLabel.appendChild(document.createTextNode(" Company"));

        radioDiv.appendChild(personLabel);
        radioDiv.appendChild(companyLabel);
        form.appendChild(radioDiv);

        const personFields = document.createElement("div");
        personFields.id = "person-fields";
        personFields.style.display = "";

        const firstName = document.createElement("input");
        firstName.type = "text";
        firstName.id = "firstName";
        firstName.placeholder = "First Name";

        const lastName = document.createElement("input");
        lastName.type = "text";
        lastName.id = "lastName";
        lastName.placeholder = "Last Name";

        personFields.appendChild(firstName);
        personFields.appendChild(lastName);
        form.appendChild(personFields);

        const companyFields = document.createElement("div");
        companyFields.id = "company-fields";
        companyFields.style.display = "none";

        const companyName = document.createElement("input");
        companyName.type = "text";
        companyName.id = "companyName";
        companyName.placeholder = "Company Name";

        const vatNumber = document.createElement("input");
        vatNumber.type = "text";
        vatNumber.id = "vatNumber";
        vatNumber.placeholder = "VAT Number";

        companyFields.appendChild(companyName);
        companyFields.appendChild(vatNumber);
        form.appendChild(companyFields);

        const email = document.createElement("input");
        email.type = "email";
        email.id = "email";
        email.placeholder = "Email";
        email.required = true;

        const phone = document.createElement("input");
        phone.type = "text";
        phone.id = "phone";
        phone.placeholder = "Phone";

        const billingAddress = document.createElement("input");
        billingAddress.type = "text";
        billingAddress.id = "billingAddress";
        billingAddress.placeholder = "Billing Address";

        const billingPostal = document.createElement("input");
        billingPostal.type = "text";
        billingPostal.id = "billingPostal";
        billingPostal.placeholder = "Postal Code";

        const billingCity = document.createElement("input");
        billingCity.type = "text";
        billingCity.id = "billingCity";
        billingCity.placeholder = "City";

        form.appendChild(email);
        form.appendChild(phone);
        form.appendChild(billingAddress);
        form.appendChild(billingPostal);
        form.appendChild(billingCity);

        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.id = "submit-btn";
        submitBtn.textContent = "Lagre";
        form.appendChild(submitBtn);


        container.appendChild(form);

        return container;
    }
};