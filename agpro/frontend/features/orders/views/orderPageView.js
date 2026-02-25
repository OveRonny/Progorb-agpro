import {
    CustomerDropdown
} from "../../dropdowns/customerDropdown.js";

export const OrderPageView = {
    render(customers) {
        const container = document.createElement('div');

        const form = document.createElement('form');
        form.id = "order-form";

        const title = document.createElement('h2');
        title.textContent = "Ordre";
        form.appendChild(title);

        const customerDropdown = CustomerDropdown({
            customers,
            onchange: (customerId) => console.log("Kunde valgt", customerId)
        });
        form.appendChild(customerDropdown);

        
        const ordreNrLabel = document.createElement("label");
        ordreNrLabel.textContent = "Ordrenummer";
        form.appendChild(ordreNrLabel);

        const ordreNrInput = document.createElement("input");
        ordreNrInput.type = "number";
        ordreNrInput.id = "ordreNr";
        ordreNrInput.placeholder = "Genereres automatisk";
        ordreNrInput.readOnly = true;
        form.appendChild(ordreNrInput);

        
        const bestNrLabel = document.createElement("label");
        bestNrLabel.textContent = "Bestillingsnummer";
        form.appendChild(bestNrLabel);

        const bestNrInput = document.createElement("input");
        bestNrInput.type = "text";
        bestNrInput.id = "bestNr";
        form.appendChild(bestNrInput);

        container.appendChild(form);
        return container;
    }
}