import {
    ProductModel
} from "../models/productModel.js";
import {
    ProductTypeModel
} from "../../productTypes/models/productTypeModel.js";
export const ProductFormView = {
    render() {
        return `
            <div class="h2-header">
                <h2>Produkter</h2>
            </div>
            <div class="btn-produkt-form">
                <button id="toggle-product-form">Se produkt form</button>
            </div>
            <input type="hidden" id="produktId" value="">
            <form id="product-form" class="product-form-class hidden">
             
                <input type="text" id="nobbnr" placeholder="Nobbnr" required>               
                <input type="text" id="description" placeholder="Description" />
                <input type="number" id="price" placeholder="Price" step="0.01" required>
                <input type="number" id="meterPerSquare" placeholder="Meter per Square" step="0.01" required >   

                <select id="unit" class="unit-class" required></select>             
                <select id="productType" class="product-type" required></select>              
                <div>
                    <button type="submit" id="submit-btn">Lagre</button>
                </div>
            </form>
        `;
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
       
        select.addEventListener("change", (e) => {
            if (e.target.value === "__new__" && typeof onAddNewCallback === "function") {
                onAddNewCallback();                
                select.value = types.length ? types[0].id : "";
            }
        });
    }
};