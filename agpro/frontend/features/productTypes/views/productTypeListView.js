export const ProductTypeListView = {
    render(productTypes) {
        if (!productTypes || productTypes.length === 0) {
            return `<p>No product types found.</p>`;
        }

        const rows = productTypes.map(pt => `
            <tr>
                <td>${pt.name}</td>
                <td>
                    <button class="edit-btn" data-id="${pt.id}">Edit</button>
                    <button class="delete-btn" data-id="${pt.id}">Delete</button>
                </td>                
            </tr>
        `).join('');

        return `
            <h2>Product Types</h2>
            
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
       
        `;
    }
}