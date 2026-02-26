import {
    ProductModel
} from "../models/productModel.js";
import {
    ProductTypeModel
} from "../../productTypes/models/productTypeModel.js"
import {
    ProductFormView
} from "../views/productFormView.js";
import {
    ProductTypeModalController
} from '../../productTypes/controllers/productTypeModalController.js';

export const ProductFormController = {
    init(container, onSaved) {
        this.container = container;
        this.onSaved = onSaved;

        this.form = ProductFormView.render();
        container.appendChild(this.form);

        this.toggleBtn = this.form.querySelector("#toggle-product-form");
        this.productForm = this.form.querySelector("#product-form");
        this.submitBtn = this.form.querySelector("#submit-btn");

        this.toggleBtn.addEventListener("click", () => {
            this.productForm.classList.toggle("hidden");
        });

        this.productForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = this.productForm.dataset.id || "";
            const productData = {
                nobbnr: this.form.querySelector("#nobbnr").value,
                description: this.form.querySelector("#description").value,
                price: parseFloat(this.form.querySelector("#price").value),
                meterPerSquare: parseFloat(this.form.querySelector("#meterPerSquare").value),
                unit: this.form.querySelector("#unit").value,
                productTypeId: parseInt(this.form.querySelector("#productType").value)
            };

            try {
                if (id) await ProductModel.updateProduct(id, productData);
                else await ProductModel.addProduct(productData);

                this.resetForm();
                if (this.onSaved) this.onSaved();
            } catch (err) {
                alert("Error saving product: " + err.message);
            }
        });
    },

    async loadUnits() {
        const units = await ProductModel.getUnits();
        const select = this.form.querySelector("#unit");
        select.innerHTML = "";
        units.forEach(u => {
            const option = document.createElement("option");
            option.value = u;
            option.textContent = u;
            select.appendChild(option);
        });
    },

    async initProductTypeSelect() {
        const productTypeSelect = this.form.querySelector("#productType");
        const addBtn = this.form.querySelector("#addProductTypeBtn");

        // Last eksisterende typer
        const types = await ProductTypeModel.getAll();
        productTypeSelect.innerHTML = "";
        types.forEach(pt => {
            const option = document.createElement("option");
            option.value = pt.id;
            option.textContent = pt.name;
            productTypeSelect.appendChild(option);
        });

        // Event listener på “➕” knappen
        addBtn.addEventListener("click", async () => {
            await ProductTypeModalController.openModal(productTypeSelect);
        });
    },

   /*  async initProductTypeModal() {
        const productTypeSelect = this.form.querySelector("#productType");

        productTypeSelect.addEventListener("mousedown", async (e) => {
            const option = e.target.closest("option");

            if (option && option.value === "__new__") {
                e.preventDefault();
                await ProductTypeModalController.openModal(productTypeSelect);
            }
        });

        const types = await ProductTypeModel.getAll();
        productTypeSelect.innerHTML = "";
        types.forEach(pt => {
            const option = document.createElement("option");
            option.value = pt.id;
            option.textContent = pt.name;
            productTypeSelect.appendChild(option);
        });

        /* const addNewOption = document.createElement("option");
        addNewOption.value = "__new__";
        addNewOption.textContent = "➕ Legg til ny type";
        productTypeSelect.appendChild(addNewOption); */

      
    
        

    fillForm(product) {
        this.productForm.dataset.id = product.id;
        this.form.querySelector("#nobbnr").value = product.nobbnr;
        this.form.querySelector("#description").value = product.description || "";
        this.form.querySelector("#price").value = product.price ?? "";
        this.form.querySelector("#meterPerSquare").value = product.meterPerSquare ?? "";
        this.form.querySelector("#unit").value = product.unit || "";
        this.form.querySelector("#productType").value = product.productTypeId || "";
        this.submitBtn.textContent = "Oppdater";
        this.productForm.classList.remove("hidden");
    },

    resetForm() {
        this.productForm.reset();
        this.productForm.dataset.id = "";
        this.submitBtn.textContent = "Lagre";
        this.productForm.classList.add("hidden");
    }
};