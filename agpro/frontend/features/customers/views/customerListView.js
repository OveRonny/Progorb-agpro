export const CustomerListView = {
    render(customers) {
        if (!customers || customers.length === 0) {
            return `<p>No customers found.</p>`;
        }

        // Lag tabellrader
        const rows = customers.map(c => {
            const name = c.isPerson
                ? `${c.firstName} ${c.lastName}`
                : c.companyName;

            const vat = c.isPerson ? '-' : c.vatNumber || '-';
            const email = c.email || '-';
            const phone = c.phone || '-';
            const address = c.billingAddress || '-';
            const postal = c.billingPostal || '-';
            const city = c.billingCity || '-';

            return `
                <tr>
                    <td>${name}</td>
                    <td>${vat}</td>
                    <td>${email}</td>
                    <td>${phone}</td>
                    <td>${address}</td>
                    <td>${postal}</td>
                    <td>${city}</td>
                    <td>
                        <button class="edit-btn" data-id="${c.id}">Edit</button>
                        <button class="delete-btn" data-id="${c.id}">Delete</button>
                    </td>       
                </tr>
            `;
        }).join('');

        return `
            <h2>Kunder</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name / Company</th>
                        <th>VAT Number</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Postal</th>
                        <th>City</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
            
        `;
    }
};
