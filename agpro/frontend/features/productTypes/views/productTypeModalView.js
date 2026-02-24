export const ProductTypeModalView = {
    render() {
        return `             
           
            <dialog id="productTypeModal">
                <div class="modal-content">
                    <h2>Legg til Produkt Type</h2>

                    <form id="productTypeForm">
                        <input 
                            type="text" 
                            id="productTypeName" 
                            placeholder="Navn"
                            required
                        />

                        <div class="modal-actions">
                            <button type="button" id="closeModal">Avbryt</button>
                            <button type="submit">Lagre</button>
                        </div>
                    </form>
                </div>
            </dialog>
        `;
    }
}

