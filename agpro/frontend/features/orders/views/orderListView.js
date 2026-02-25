export const OrderListView = {
    render(orders) {
        if (!orders || orders.lenght === 0) {
            return `<p>No orders found.</p>`;
        }

        const rows = orders.map(o => `
            
            <tr>
                <td>${o.ordreNr}</td>
                <td>${o.bestNr}</td>
                <td>${o.customerId}</td>
                <td>${o.deliveryAddressId}</td>
                <td>
                    <button class="edit-btn" data-id="${o.id}">Edit</button>
                    <button class="delete-btn" data-id="${o.id}">Delete</button>
                </td>
            </tr>         
                        
        `).join('');

        return `
            <div class="table-wrapper">
                <h2>Ordrer</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ordreNr</th>
                            <th>bestNr</th>
                            <th>customerId</th>
                            <th>deliveryAddressId</th>                          
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>        
        `;

    }
}