export const ProductListView = {
    render(products) {
        if (!products || products.length === 0) {
            return `<p>No products found.</p>`;
        }

        const rows = products.map(p => `
            <tr>
                <td>${p.nobbnr}</td>
                <td>${p.productType?.name || '-'}</td>
                <td>${p.unit}</td>
                <td>${p.description || '-'}</td>
                <td>${p.price != null ? Number(p.price).toFixed(2) + ' kr' : '-'}</td>
                <td>${p.meterPerSquare != null ? Number(p.meterPerSquare).toFixed(2) : '-'}</td>                  
                <td>
                    <button class="edit-btn" data-id="${p.id}">Edit</button>
                    <button class="delete-btn" data-id="${p.id}">Delete</button>
                </td>
            </tr>
        `).join('');

        return `
            
            <div class="table-wrapper">
                <h2>Products</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nobbnr</th>
                            <th>Product Type</th>
                            <th>Unit</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Meter per Square</th>                        
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;               


    }
};