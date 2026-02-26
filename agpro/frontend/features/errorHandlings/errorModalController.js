import { ErrorModalView } from "./errorModalView.js";

export const ErrorModalController = {
    modalInstance: null,

    showError(message) {
        
        if (this.modalInstance) {
            this.modalInstance.querySelector("p").textContent = message;
        } else {
            this.modalInstance = ErrorModalView.render(message);
            this.modalInstance.addEventListener("close", () => {
                this.modalInstance.remove();
                this.modalInstance = null;
            });
        }

        this.modalInstance.showModal();
    }
};