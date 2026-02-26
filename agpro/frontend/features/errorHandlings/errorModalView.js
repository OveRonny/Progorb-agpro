export const ErrorModalView = {
    render(message) {
        const dialog = document.createElement("dialog");
        dialog.classList.add("error-modal");

        const content = document.createElement("div");
        content.classList.add("modal-content");

        const heading = document.createElement("h2");
        heading.textContent = "Feil";

        const p = document.createElement("p");
        p.textContent = message;

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "Lukk";
        closeBtn.addEventListener("click", () => dialog.close());

        content.appendChild(heading);
        content.appendChild(p);
        content.appendChild(closeBtn);

        dialog.appendChild(content);
        document.body.appendChild(dialog);

        return dialog;
    }
};