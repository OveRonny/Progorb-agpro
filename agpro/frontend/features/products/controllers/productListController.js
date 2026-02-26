import { ProductListView } from "../views/productListView.js";
import { ProductModel } from "../models/productModel.js";

export const ProductListController = {
    init(container, onEdit) {
        this.container = container;
        this.onEdit = onEdit;
    },

    render(products) {
        this.container.innerHTML = "";
        const listNode = ProductListView.render(products);
        this.container.appendChild(listNode);
        
        listNode.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                const product = products.find(p => p.id == id);
                if (product && this.onEdit) this.onEdit(product);
            });
        });

        listNode.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                if (confirm("Er du sikker på at du vil slette dette produktet?")) {
                    try {
                        await ProductModel.deleteProduct(id);                        
                        if (this.onEdit) this.onEdit(); 
                    } catch (err) {
                        alert("Error deleting product: " + err.message);
                    }
                }
            });
        });
    }
};