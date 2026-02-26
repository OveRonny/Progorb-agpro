export const ProductTypeModalView = {
    render() {
        
        const dialog = document.createElement("dialog");
        dialog.id = "productTypeModal";
       
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        
        const heading = document.createElement("h2");
        heading.textContent = "Legg til Produkt Type";
        
        const form = document.createElement("form");
        form.id = "productTypeForm";

        const input = document.createElement("input");
        input.type = "text";
        input.id = "productTypeName";
        input.placeholder = "Navn";
        input.required = true;
        
        const actions = document.createElement("div");
        actions.classList.add("modal-actions");

        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.id = "closeModal";
        closeBtn.textContent = "Avbryt";

        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.textContent = "Lagre";
        
        actions.appendChild(closeBtn);
        actions.appendChild(submitBtn);

        form.appendChild(input);
        form.appendChild(actions);

        modalContent.appendChild(heading);
        modalContent.appendChild(form);

        dialog.appendChild(modalContent);

        return dialog;
    }
};

