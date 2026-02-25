import {
    ProductModel
} from "../models/productModel.js";
import {
    ProductTypeModel
} from "../../productTypes/models/productTypeModel.js";

export const ProductFormView = {
    render() {
        const container = document.createElement("div");

        // Header
        const headerDiv = document.createElement("div");
        headerDiv.classList.add("h2-header");
        const h2 = document.createElement("h2");
        h2.textContent = "Produkter";
        headerDiv.appendChild(h2);
        container.appendChild(headerDiv);

        // Toggle button
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btn-produkt-form");
        const toggleBtn = document.createElement("button");
        toggleBtn.id = "toggle-product-form";
        toggleBtn.textContent = "Se produkt form";
        btnDiv.appendChild(toggleBtn);
        container.appendChild(btnDiv);

        // Hidden input
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.id = "produktId";
        container.appendChild(hiddenInput);

        // Form
        const form = document.createElement("form");
        form.id = "product-form";
        form.classList.add("product-form-class", "hidden");

        // Nobbnr
        const nobbnr = document.createElement("input");
        nobbnr.type = "text";
        nobbnr.id = "nobbnr";
        nobbnr.placeholder = "Nobbnr";
        nobbnr.required = true;
        form.appendChild(nobbnr);

        // Description
        const description = document.createElement("input");
        description.type = "text";
        description.id = "description";
        description.placeholder = "Description";
        form.appendChild(description);

        // Price
        const price = document.createElement("input");
        price.type = "number";
        price.id = "price";
        price.placeholder = "Price";
        price.step = "0.01";
        price.required = true;
        form.appendChild(price);

        // Meter per square
        const meterPerSquare = document.createElement("input");
        meterPerSquare.type = "number";
        meterPerSquare.id = "meterPerSquare";
        meterPerSquare.placeholder = "Meter per Square";
        meterPerSquare.step = "0.01";
        meterPerSquare.required = true;
        form.appendChild(meterPerSquare);

        // Unit select
        const unitSelect = document.createElement("select");
        unitSelect.id = "unit";
        unitSelect.classList.add("unit-class");
        unitSelect.required = true;
        form.appendChild(unitSelect);

        // ProductType select
        const typeSelect = document.createElement("select");
        typeSelect.id = "productType";
        typeSelect.classList.add("product-type");
        typeSelect.required = true;
        form.appendChild(typeSelect);

        // Submit button
        const btnDivSubmit = document.createElement("div");
        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.id = "submit-btn";
        submitBtn.textContent = "Lagre";
        btnDivSubmit.appendChild(submitBtn);
        form.appendChild(btnDivSubmit);

        container.appendChild(form);

        return container;
    },

    async loadUnits() {
        const units = await ProductModel.getUnits();
        const select = document.getElementById("unit");
        if (!select) return;

        select.innerHTML = "";
        units.forEach(u => {
            const option = document.createElement("option");
            option.value = u;
            option.textContent = u;
            select.appendChild(option);
        });
    },

    async fillProductTypes(onAddNewCallback) {
        const types = await ProductTypeModel.getAll();
        const select = document.getElementById("productType");
        if (!select) return;

        select.innerHTML = "";

        types.forEach(pt => {
            const option = document.createElement("option");
            option.value = pt.id;
            option.textContent = pt.name;
            select.appendChild(option);
        });

        const addNewOption = document.createElement("option");
        addNewOption.value = "__new__";
        addNewOption.textContent = "➕ Legg til ny type";
        select.appendChild(addNewOption);

        select.addEventListener("change", e => {
            if (e.target.value === "__new__" && typeof onAddNewCallback === "function") {
                onAddNewCallback();
                select.value = types.length ? types[0].id : "";
            }
        });
    }
};