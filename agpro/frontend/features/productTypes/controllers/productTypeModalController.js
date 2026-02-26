import {
    ProductTypeModel
} from "../models/productTypeModel.js";
import {
    ProductTypeModalView
} from "../views/productTypeModalView.js";
import {
    ErrorModalController
} from "../../errorHandlings/errorModalController.js"

export const ProductTypeModalController = {
    modalInstance: null,

    async openModal(selectNode) {
        if (!this.modalInstance) {
            const modal = ProductTypeModalView.render();
            document.body.appendChild(modal);
            this.modalInstance = modal;

            const form = modal.querySelector("#productTypeForm");
            const closeBtn = modal.querySelector("#closeModal");

            closeBtn.addEventListener("click", () => modal.close());

            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const name = form.querySelector("#productTypeName").value.trim();
                if (!name) return;

                const result = await ProductTypeModel.create({
                    name
                });

                console.log("Result from create:", result);
                
                if (result.status === "failure") {
                    ErrorModalController.showError("Noe gikk galt: " + result.message);
                } else if (result.status === "alreadyExists") {
                    const existingOption = selectNode.querySelector(`option[value="${result.value.id}"]`);
                    if (!existingOption) {
                        const option = document.createElement("option");
                        option.value = result.value.id;
                        option.textContent = result.value.name;
                        selectNode.appendChild(option);
                    }
                    selectNode.value = result.value.id;
                    ErrorModalController.showError("ProduktType finnes allerede – valgte eksisterende");
                } else if (result.status === "success") {
                    const option = document.createElement("option");
                    option.value = result.value.id;
                    option.textContent = result.value.name;
                    selectNode.appendChild(option);
                    selectNode.value = result.value.id;
                }

                modal.close();
            });


            modal.addEventListener("close", () => form.reset());
        }
        
        this.modalInstance.showModal();
    }
};