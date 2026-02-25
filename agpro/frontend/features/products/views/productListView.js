export const ProductListView = {
    render(products) {
        const container = document.createElement("div");

        if (!Array.isArray(products) || products.length === 0) {
            const noProducts = document.createElement("p");
            noProducts.textContent = "No products found.";
            container.appendChild(noProducts);
            return container;
        }
        
        container.classList.add("table-wrapper");

        const title = document.createElement("h2");
        title.textContent = "Products";
        container.appendChild(title);

        if (!products || products.length === 0) {
            const noProducts = document.createElement("p");
            noProducts.textContent = "No products found.";
            container.appendChild(noProducts);
            return container;
        }

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const headers = [
            "Nobbnr",
            "Product Type",
            "Unit",
            "Description",
            "Price",
            "Meter per Square",
            "Actions"
        ];

        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        products.forEach(p => {
            const tr = document.createElement("tr");

            const values = [
                p.nobbnr,
                p.productType?.name || "-",
                p.unit,
                p.description || "-",
                p.price != null ? Number(p.price).toFixed(2) + " kr" : "-",
                p.meterPerSquare != null ? Number(p.meterPerSquare).toFixed(2) : "-"
            ];

            values.forEach(v => {
                const td = document.createElement("td");
                td.textContent = v;
                tr.appendChild(td);
            });

            // Actions
            const actionsTd = document.createElement("td");

            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn");
            editBtn.dataset.id = p.id;
            editBtn.textContent = "Edit";

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.dataset.id = p.id;
            deleteBtn.textContent = "Delete";

            actionsTd.appendChild(editBtn);
            actionsTd.appendChild(deleteBtn);
            tr.appendChild(actionsTd);

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        container.appendChild(table);

        return container;
    }
};