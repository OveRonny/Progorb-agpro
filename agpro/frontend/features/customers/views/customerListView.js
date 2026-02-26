export const CustomerListView = {
  render(customers) {
    const container = document.createElement("div"); 

    if (!customers || customers.length === 0) {
      const noCustomers = document.createElement("p");
      noCustomers.textContent = "No customers found.";
      container.appendChild(noCustomers);
      return container; 
    }
   
    const title = document.createElement("h2");
    title.textContent = "Kunder";
    container.appendChild(title);

    const table = document.createElement("table");
    
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = [
      "Name / Company",
      "VAT Number",
      "Email",
      "Phone",
      "Address",
      "Postal",
      "City",
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

    customers.forEach(c => {
      const tr = document.createElement("tr");

      const name = c.isPerson ? `${c.firstName} ${c.lastName}` : c.companyName;
      const vat = c.isPerson ? "-" : c.vatNumber || "-";
      const email = c.email || "-";
      const phone = c.phone || "-";
      const address = c.billingAddress || "-";
      const postal = c.billingPostal || "-";
      const city = c.billingCity || "-";

      const values = [name, vat, email, phone, address, postal, city];

      values.forEach(v => {
        const td = document.createElement("td");
        td.textContent = v;
        tr.appendChild(td);
      });
      
      const actionsTd = document.createElement("td");

      const editBtn = document.createElement("button");
      editBtn.classList.add("edit-btn");
      editBtn.dataset.id = c.id;
      editBtn.textContent = "Edit";

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.dataset.id = c.id;
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