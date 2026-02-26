
export const ProductFormView = {
    render() {
        const container = document.createElement("div");
       
        const headerDiv = document.createElement("div");
        headerDiv.classList.add("h2-header");
        const h2 = document.createElement("h2");
        h2.textContent = "Produkter";
        headerDiv.appendChild(h2);
        container.appendChild(headerDiv);
        
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btn-produkt-form");
        const toggleBtn = document.createElement("button");
        toggleBtn.id = "toggle-product-form";
        toggleBtn.textContent = "Se produkt form";
        btnDiv.appendChild(toggleBtn);
        container.appendChild(btnDiv);
        
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.id = "produktId";
        container.appendChild(hiddenInput);
        
        const form = document.createElement("form");
        form.id = "product-form";
        form.classList.add("product-form-class", "hidden");
       
        const nobbnr = document.createElement("input");
        nobbnr.type = "text";
        nobbnr.id = "nobbnr";
        nobbnr.placeholder = "Nobbnr";
        nobbnr.required = true;
        form.appendChild(nobbnr);
        
        const description = document.createElement("input");
        description.type = "text";
        description.id = "description";
        description.placeholder = "Description";
        form.appendChild(description);
        
        const price = document.createElement("input");
        price.type = "number";
        price.id = "price";
        price.placeholder = "Price";
        price.step = "0.01";
        price.required = true;
        form.appendChild(price);
        
        const meterPerSquare = document.createElement("input");
        meterPerSquare.type = "number";
        meterPerSquare.id = "meterPerSquare";
        meterPerSquare.placeholder = "Meter per Square";
        meterPerSquare.step = "0.01";
        meterPerSquare.required = true;
        form.appendChild(meterPerSquare);
       
        const unitSelect = document.createElement("select");
        unitSelect.id = "unit";
        unitSelect.classList.add("unit-class");
        unitSelect.required = true;
        form.appendChild(unitSelect);
        
        const typeSelect = document.createElement("select");
        typeSelect.id = "productType";
        typeSelect.classList.add("product-type");
        typeSelect.required = true;
        form.appendChild(typeSelect);

        const modalBtn = document.createElement('button');
        modalBtn.type = 'button';
        modalBtn.id = 'addProductTypeBtn';
        modalBtn.textContent = 'Legg til type'
        form.appendChild(modalBtn);
        
        const btnDivSubmit = document.createElement("div");
        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.id = "submit-btn";
        submitBtn.textContent = "Lagre";
        btnDivSubmit.appendChild(submitBtn);
        form.appendChild(btnDivSubmit);

        container.appendChild(form);

        return container;
    }

};